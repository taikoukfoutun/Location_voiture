<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'start_date',
        'end_date',
        'total_price',
        'pickup_location',
        'status', // 'pending', 'confirmed', 'rejected', 'completed', 'cancelled'
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
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'driver_license_expiry' => 'date',
            'total_price' => 'decimal:2',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
