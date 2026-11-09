<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class GestionnaireController extends Controller
{
    /**
     * List all gestionnaire staff accounts.
     */
    public function index(Request $request)
    {
        $query = User::where('role', User::ROLE_GESTIONNAIRE);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $gestionnaires = $query->orderBy('created_at', 'desc')->get([
            'id', 'name', 'email', 'role', 'created_at', 'updated_at'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $gestionnaires,
            'count' => $gestionnaires->count(),
        ]);
    }

    /**
     * Create a new gestionnaire account.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ], [
            'name.required' => 'The full name is required.',
            'email.required' => 'The email address is required.',
            'email.unique' => 'A user or gestionnaire with this email already exists.',
            'password.required' => 'The password is required.',
            'password.min' => 'The password must be at least 6 characters.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $gestionnaire = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => User::ROLE_GESTIONNAIRE,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Gestionnaire account created successfully!',
            'data' => [
                'id' => $gestionnaire->id,
                'name' => $gestionnaire->name,
                'email' => $gestionnaire->email,
                'role' => $gestionnaire->role,
                'created_at' => $gestionnaire->created_at,
            ],
        ], 201);
    }

    /**
     * Update an existing gestionnaire account.
     */
    public function update(Request $request, $id)
    {
        $gestionnaire = User::where('id', $id)
            ->where('role', User::ROLE_GESTIONNAIRE)
            ->first();

        if (!$gestionnaire) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gestionnaire not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $gestionnaire->id],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $gestionnaire->name = $request->name;
        $gestionnaire->email = $request->email;

        if ($request->filled('password')) {
            $gestionnaire->password = Hash::make($request->password);
        }

        $gestionnaire->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Gestionnaire updated successfully!',
            'data' => [
                'id' => $gestionnaire->id,
                'name' => $gestionnaire->name,
                'email' => $gestionnaire->email,
                'role' => $gestionnaire->role,
                'updated_at' => $gestionnaire->updated_at,
            ],
        ]);
    }

    /**
     * Delete a gestionnaire account.
     */
    public function destroy($id)
    {
        $gestionnaire = User::where('id', $id)
            ->where('role', User::ROLE_GESTIONNAIRE)
            ->first();

        if (!$gestionnaire) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gestionnaire not found.',
            ], 404);
        }

        $gestionnaire->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Gestionnaire account removed successfully.',
        ]);
    }
}
