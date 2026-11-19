<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rental;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RentalController extends Controller
{
    /**
     * List all reservations or user-specific reservations.
     */
    public function index(Request $request)
    {
        $query = Rental::with(['car', 'user'])->orderBy('id', 'desc');

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->query('user_id'));
        }

        if ($request->filled('status') && $request->query('status') !== 'all') {
            $query->where('status', $request->query('status'));
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('driver_name', 'like', "%{$search}%")
                  ->orWhere('driver_email', 'like', "%{$search}%")
                  ->orWhere('driver_license_number', 'like', "%{$search}%")
                  ->orWhereHas('car', function ($cq) use ($search) {
                      $cq->where('brand', 'like', "%{$search}%")
                         ->orWhere('model', 'like', "%{$search}%");
                  });
            });
        }

        $rentals = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $rentals,
            'counts' => [
                'all' => Rental::count(),
                'pending' => Rental::where('status', 'pending')->count(),
                'confirmed' => Rental::where('status', 'confirmed')->count(),
                'rejected' => Rental::where('status', 'rejected')->count(),
                'completed' => Rental::where('status', 'completed')->count(),
            ],
        ]);
    }

    /**
     * Submit a new reservation (Pending review).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'total_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $car = Car::find($request->car_id);
        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Selected vehicle not found.',
            ], 404);
        }

        if ($car->status === 'rented') {
            return response()->json([
                'status' => 'error',
                'message' => 'This vehicle is currently rented and unavailable for reservation.',
            ], 409);
        }

        $user = User::find($request->user_id);

        $rental = Rental::create([
            'user_id' => $user->id,
            'car_id' => $car->id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $request->total_price,
            'pickup_location' => $request->pickup_location ?? 'Main Concierge Showroom',
            'status' => 'pending',
            'admin_message' => null,
            'driver_name' => $request->driver_name ?? $user->name,
            'driver_email' => $request->driver_email ?? $user->email,
            'driver_phone' => $request->driver_phone ?? $user->phone,
            'driver_national_id' => $request->driver_national_id ?? $user->national_id,
            'driver_license_number' => $request->driver_license_number ?? $user->license_number,
            'driver_license_expiry' => $request->driver_license_expiry ?? $user->license_expiry,
            'driver_address' => $request->driver_address ?? $user->address,
            'driver_avatar' => $request->driver_avatar ?? $user->avatar,
            'driver_license_doc' => $request->driver_license_doc ?? $user->license_document,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Reservation submitted successfully. It is now awaiting gestionnaire review.',
            'data' => $rental->load(['car', 'user']),
        ], 201);
    }

    /**
     * Accept, reject, or complete a reservation.
     * Automatically syncs vehicle status between 'available' and 'rented'.
     */
    public function updateStatus(Request $request, $id)
    {
        $rental = Rental::with('car')->find($id);
        if (!$rental) {
            return response()->json([
                'status' => 'error',
                'message' => 'Reservation not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,rejected,completed,cancelled',
            'admin_message' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $newStatus = $request->status;
        $car = $rental->car;

        // AUTOMATIC VEHICLE STATE SWITCHING LOGIC:
        if ($newStatus === 'confirmed') {
            // Acceptance: switch car status automatically to 'rented'
            if ($car) {
                $car->status = 'rented';
                $car->save();
            }
            $rental->status = 'confirmed';
            $rental->admin_message = $request->admin_message ?? 'Reservation verified and approved. Vehicle reserved.';
        } elseif ($newStatus === 'rejected') {
            // Rejection: vehicle remains or returns to 'available'
            if ($car && $car->status === 'rented') {
                $car->status = 'available';
                $car->save();
            }
            $rental->status = 'rejected';
            $rental->admin_message = $request->admin_message ?? 'Documentation issue detected. Please check credentials.';
        } elseif ($newStatus === 'completed' || $newStatus === 'cancelled') {
            // Vehicle return or cancellation: switch car status back to 'available'
            if ($car) {
                $car->status = 'available';
                $car->save();
            }
            $rental->status = $newStatus;
        } else {
            $rental->status = $newStatus;
        }

        $rental->save();

        return response()->json([
            'status' => 'success',
            'message' => "Reservation status updated to '{$newStatus}'.",
            'data' => $rental->fresh(['car', 'user']),
        ]);
    }

    /**
     * Update user driver profile (avatar, license, contact details).
     */
    public function updateProfile(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.',
            ], 404);
        }

        $data = $request->only([
            'name',
            'phone',
            'national_id',
            'license_number',
            'license_expiry',
            'address',
            'avatar',
            'license_document',
        ]);

        if (isset($data['license_document']) && !empty($data['license_document'])) {
            $data['license_uploaded'] = true;
        }

        $user->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Driver profile updated successfully.',
            'user' => $user->fresh(),
        ]);
    }

    /**
     * Get user profile details by ID.
     */
    public function getProfile($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user,
        ]);
    }
}
