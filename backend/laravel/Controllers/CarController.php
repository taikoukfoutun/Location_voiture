<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class CarController extends Controller
{
    /**
     * Get target folder in the React frontend assets directory.
     */
    protected function getAssetsCarsPath(): string
    {
        $path = base_path('../frontend/react/assets/cars');
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }
        return realpath($path) ?: $path;
    }

    /**
     * Display a listing of cars.
     */
    public function index(Request $request)
    {
        $query = Car::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('license_plate', 'like', "%{$search}%");
            });
        }

        $cars = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $cars,
            'count' => $cars->count(),
        ]);
    }

    /**
     * Store a newly created car in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 2)],
            'category' => ['required', 'string', 'max:50'],
            'license_plate' => ['required', 'string', 'max:30', 'unique:cars,license_plate'],
            'daily_rate' => ['required', 'numeric', 'min:0'],
            'fuel_type' => ['required', 'in:Petrol,Diesel,Electric,Hybrid'],
            'transmission' => ['required', 'in:Automatic,Manual'],
            'seating_capacity' => ['required', 'integer', 'min:1', 'max:20'],
            'horsepower' => ['nullable', 'integer', 'min:0'],
            'image' => [$request->hasFile('image') ? 'file' : 'nullable', 'max:10240'],
            'status' => ['nullable', 'in:available,rented,maintenance'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $data = $validator->validated();
        $data['status'] = $data['status'] ?? 'available';

        // Process uploaded image to frontend/react/assets/cars
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = 'car_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($this->getAssetsCarsPath(), $fileName);
            $data['image'] = '/react/assets/cars/' . $fileName;
        } elseif ($request->filled('image_preset')) {
            $data['image'] = $request->image_preset;
        } else {
            $data['image'] = '/react/assets/luxury_coastal_car.jpg';
        }

        $car = Car::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Car added to fleet successfully!',
            'data' => $car,
        ], 201);
    }

    /**
     * Display the specified car.
     */
    public function show($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Car not found.',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $car,
        ]);
    }

    /**
     * Update the specified car in storage.
     */
    public function update(Request $request, $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Car not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'brand' => ['required', 'string', 'max:100'],
            'model' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 2)],
            'category' => ['required', 'string', 'max:50'],
            'license_plate' => ['required', 'string', 'max:30', 'unique:cars,license_plate,' . $car->id],
            'daily_rate' => ['required', 'numeric', 'min:0'],
            'fuel_type' => ['required', 'in:Petrol,Diesel,Electric,Hybrid'],
            'transmission' => ['required', 'in:Automatic,Manual'],
            'seating_capacity' => ['required', 'integer', 'min:1', 'max:20'],
            'horsepower' => ['nullable', 'integer', 'min:0'],
            'image' => [$request->hasFile('image') ? 'file' : 'nullable', 'max:10240'],
            'status' => ['required', 'in:available,rented,maintenance'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $data = $validator->validated();

        // Handle image replacement
        if ($request->hasFile('image')) {
            // Remove previous custom car image if located in cars subfolder
            if ($car->image && str_starts_with($car->image, '/react/assets/cars/')) {
                $oldPath = base_path('../frontend' . $car->image);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $file = $request->file('image');
            $fileName = 'car_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($this->getAssetsCarsPath(), $fileName);
            $data['image'] = '/react/assets/cars/' . $fileName;
        } else {
            // Retain existing image if not replacing
            unset($data['image']);
        }

        $car->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Car updated successfully!',
            'data' => $car,
        ]);
    }

    /**
     * Remove the specified car from storage.
     */
    public function destroy($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json([
                'status' => 'error',
                'message' => 'Car not found.',
            ], 404);
        }

        // Safeguard 1: Status check
        if ($car->status === 'rented') {
            return response()->json([
                'status' => 'error',
                'message' => 'Action blocked: Cannot delete a vehicle that is currently marked as rented.',
            ], 422);
        }

        // Safeguard 2: Database rental check
        if (Schema::hasTable('rentals')) {
            $hasActiveRentals = DB::table('rentals')
                ->where('car_id', $car->id)
                ->whereIn('status', ['active', 'pending'])
                ->exists();

            if ($hasActiveRentals) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Action blocked: This car has an active or pending customer rental.',
                ], 422);
            }
        }

        // Remove custom uploaded image if present
        if ($car->image && str_starts_with($car->image, '/react/assets/cars/')) {
            $imgPath = base_path('../frontend' . $car->image);
            if (file_exists($imgPath)) {
                @unlink($imgPath);
            }
        }

        $car->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Car successfully removed from fleet.',
        ]);
    }
}
