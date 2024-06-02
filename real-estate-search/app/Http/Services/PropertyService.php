<?php

namespace App\Http\Services;

use App\Models\Property;
use Illuminate\Support\Facades\Cache;

class PropertyService {

    public function searchProperties($request)
    {
        $currentPage = $request->get('page', 1);
        $cacheKey = $this->generateCacheKey($request, $currentPage);

        $propertiesData = Cache::remember($cacheKey, 10, function () use ($request) {

            $query = Property::query(); 

            $propertyColumns = [
                'id',
                'project_name',
                'short_title',
                'price',
                'bedroom_count',
                'area',
                'short_description',
                'type'
            ];

            // Apply filters and eager load images efficiently
           $query->select($propertyColumns)
            ->filter($request)
            ->with(['images:id,url,property_id']);

         return $query->paginate(12);
        });

        return $propertiesData;
    }

    private function generateCacheKey($request, $currentPage)
    {
        $filterParams = $request->except('page'); // Exclude 'page' from the cache key

        return 'properties_' . md5(json_encode($filterParams)) . '_page_' . $currentPage;
    }
}