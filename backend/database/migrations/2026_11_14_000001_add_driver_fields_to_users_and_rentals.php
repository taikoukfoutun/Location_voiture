<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Add driver profile columns to users table
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'avatar')) {
                $table->longText('avatar')->nullable()->after('role');
            }
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone', 50)->nullable()->after('avatar');
            }
            if (!Schema::hasColumn('users', 'national_id')) {
                $table->string('national_id', 100)->nullable()->after('phone');
            }
            if (!Schema::hasColumn('users', 'license_number')) {
                $table->string('license_number', 100)->nullable()->after('national_id');
            }
            if (!Schema::hasColumn('users', 'license_expiry')) {
                $table->date('license_expiry')->nullable()->after('license_number');
            }
            if (!Schema::hasColumn('users', 'address')) {
                $table->string('address', 255)->nullable()->after('license_expiry');
            }
            if (!Schema::hasColumn('users', 'license_document')) {
                $table->longText('license_document')->nullable()->after('address');
            }
            if (!Schema::hasColumn('users', 'license_uploaded')) {
                $table->boolean('license_uploaded')->default(false)->after('license_document');
            }
        });

        // 2. Add verification, message, and driver snapshot columns to rentals table
        if (Schema::hasTable('rentals')) {
            try {
                DB::statement("ALTER TABLE rentals MODIFY COLUMN status VARCHAR(50) NOT NULL DEFAULT 'pending'");
            } catch (\Throwable $e) {
                // Ignore if already modified or sqlite
            }

            Schema::table('rentals', function (Blueprint $table) {
                if (!Schema::hasColumn('rentals', 'pickup_location')) {
                    $table->string('pickup_location', 255)->nullable()->after('total_price');
                }
                if (!Schema::hasColumn('rentals', 'admin_message')) {
                    $table->text('admin_message')->nullable()->after('status');
                }
                if (!Schema::hasColumn('rentals', 'driver_name')) {
                    $table->string('driver_name', 255)->nullable()->after('admin_message');
                }
                if (!Schema::hasColumn('rentals', 'driver_email')) {
                    $table->string('driver_email', 255)->nullable()->after('driver_name');
                }
                if (!Schema::hasColumn('rentals', 'driver_phone')) {
                    $table->string('driver_phone', 50)->nullable()->after('driver_email');
                }
                if (!Schema::hasColumn('rentals', 'driver_national_id')) {
                    $table->string('driver_national_id', 100)->nullable()->after('driver_phone');
                }
                if (!Schema::hasColumn('rentals', 'driver_license_number')) {
                    $table->string('driver_license_number', 100)->nullable()->after('driver_national_id');
                }
                if (!Schema::hasColumn('rentals', 'driver_license_expiry')) {
                    $table->date('driver_license_expiry')->nullable()->after('driver_license_number');
                }
                if (!Schema::hasColumn('rentals', 'driver_address')) {
                    $table->string('driver_address', 255)->nullable()->after('driver_license_expiry');
                }
                if (!Schema::hasColumn('rentals', 'driver_avatar')) {
                    $table->longText('driver_avatar')->nullable()->after('driver_address');
                }
                if (!Schema::hasColumn('rentals', 'driver_license_doc')) {
                    $table->longText('driver_license_doc')->nullable()->after('driver_avatar');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'avatar',
                'phone',
                'national_id',
                'license_number',
                'license_expiry',
                'address',
                'license_document',
                'license_uploaded',
            ]);
        });

        if (Schema::hasTable('rentals')) {
            Schema::table('rentals', function (Blueprint $table) {
                $table->dropColumn([
                    'pickup_location',
                    'admin_message',
                    'driver_name',
                    'driver_email',
                    'driver_phone',
                    'driver_national_id',
                    'driver_license_number',
                    'driver_license_expiry',
                    'driver_address',
                    'driver_avatar',
                    'driver_license_doc',
                ]);
            });
        }
    }
};
