<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'brand',
        'model',
        'year',
        'category',
        'license_plate',
        'daily_rate',
        'fuel_type',
        'transmission',
        'seating_capacity',
        'horsepower',
        'image',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'daily_rate' => 'decimal:2',
            'seating_capacity' => 'integer',
            'horsepower' => 'integer',
        ];
    }
}
