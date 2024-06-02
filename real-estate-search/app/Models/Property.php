<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function scopeFilter($query,$request):Builder
    {

        // Apply filters
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('bedroom_count')) {
            $query->where('bedroom_count', $request->bedroom_count);
        }
        
        if ($request->filled('min_price') || $request->filled('max_price')) {
            $minPrice = $request->min_price ?? 0;
            $maxPrice = $request->max_price ?? PHP_INT_MAX;
            $query->whereBetween('price', [$minPrice, $maxPrice]);
        }

        if ($request->filled('min_area') || $request->filled('max_area')) {
            $minArea = $request->min_area ?? 0;
            $maxArea = $request->max_area ?? PHP_INT_MAX;
            $query->whereBetween('area', [$minArea, $maxArea]);
        }
        
        return $query;
    }
}
