<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * List all registered client users (Super Admin only).
     */
    public function index(Request $request)
    {
        // Query users excluding super admin accounts
        $query = User::where('role', '!=', User::ROLE_ADMIN);

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'deactivated' || $request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('national_id', 'like', "%{$search}%")
                  ->orWhere('license_number', 'like', "%{$search}%");
            });
        }

        $users = $query->withCount('rentals')
            ->orderBy('created_at', 'desc')
            ->get([
                'id',
                'name',
                'email',
                'role',
                'avatar',
                'phone',
                'national_id',
                'license_number',
                'license_expiry',
                'address',
                'license_uploaded',
                'is_active',
                'created_at',
                'updated_at',
            ]);

        $totalUsers = User::where('role', '!=', User::ROLE_ADMIN)->count();
        $activeUsers = User::where('role', '!=', User::ROLE_ADMIN)->where('is_active', true)->count();
        $deactivatedUsers = User::where('role', '!=', User::ROLE_ADMIN)->where('is_active', false)->count();

        return response()->json([
            'status' => 'success',
            'data' => $users,
            'counts' => [
                'total' => $totalUsers,
                'active' => $activeUsers,
                'deactivated' => $deactivatedUsers,
            ],
        ]);
    }

    /**
     * Toggle active/deactivated status of a user account.
     */
    public function toggleStatus(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.',
            ], 404);
        }

        if ($user->role === User::ROLE_ADMIN) {
            return response()->json([
                'status' => 'error',
                'message' => 'Administrator accounts cannot be deactivated.',
            ], 403);
        }

        if ($request->has('is_active')) {
            $user->is_active = $request->boolean('is_active');
        } else {
            $user->is_active = !$user->is_active;
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User account has been ' . ($user->is_active ? 'activated' : 'deactivated') . ' successfully.',
            'data' => $user,
        ]);
    }

    /**
     * Delete a user account (Super Admin only).
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found.',
            ], 404);
        }

        if ($user->role === User::ROLE_ADMIN) {
            return response()->json([
                'status' => 'error',
                'message' => 'Administrator accounts cannot be deleted.',
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User account removed successfully.',
        ]);
    }
}
