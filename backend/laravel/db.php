<?php

namespace App;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Exception;

/**
 * This file serves as the bridge between the Laravel backend application
 */
class DbBridge
{
    /**
     * Check if the MySQL database connection is active and healthy.
     * 
     * @return array Status information
     */
    public static function checkConnection(): array
    {
        try {
            DB::connection()->getPdo();
            $dbName = DB::connection()->getDatabaseName();
            $tableCount = count(DB::select('SHOW TABLES'));

            return [
                'connected' => true,
                'driver' => 'mysql',
                'database' => $dbName,
                'tables_count' => $tableCount,
                'message' => 'Successfully connected to MySQL database.'
            ];
        } catch (Exception $e) {
            return [
                'connected' => false,
                'error' => $e->getMessage(),
                'message' => 'Failed to connect to MySQL database.'
            ];
        }
    }

    /**
     * Inspect the `users` table schema and statistics.
     * 
     * @return array Table info
     */
    public static function getUsersTableStats(): array
    {
        try {
            $userCount = User::count();
            $columns = DB::select('DESCRIBE users');

            return [
                'table' => 'users',
                'total_users' => $userCount,
                'columns' => array_map(fn($col) => $col->Field, $columns),
            ];
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Find a user by email address.
     * 
     * @param string $email
     * @return User|null
     */
    public static function getUserByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    /**
     * Create and persist a new user record into MySQL.
     * 
     * @param array $data ['name' => ..., 'email' => ..., 'password' => ...]
     * @return User
     */
    public static function createUser(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
