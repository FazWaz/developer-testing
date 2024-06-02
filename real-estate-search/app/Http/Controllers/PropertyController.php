<?php

namespace App\Http\Controllers;

use App\Http\Services\PropertyService;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    protected $propertyService;

    public function __construct(PropertyService $propertyService)
    {
        $this->propertyService = $propertyService;
    }

    public function search(Request $request)
    {
        $properties = $this->propertyService->searchProperties($request);
        
        return view('properties.index', compact('properties'));
    }

}
