@extends('layouts.app')

@section('content')
   <form method="GET" action="{{ route('properties.search') }}" class="mt-4">
        <div class="row g-3">
            <div class="col-md-3">
                <div class="form-group">
                    <label for="price-range" class="form-label">Type</label>
                    <select class="form-select form-control" aria-label=".form-select-lg example" name="type">
                        <option selected value="">Choose Type</option>
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="price-range" class="form-label">Price Range</label>
                    <div class="input-group">
                        <input type="number" id="min_price" name="min_price" class="form-control" placeholder="Min Price">
                        <span class="input-group-text">-</span>
                        <input type="number" id="max_price" name="max_price" class="form-control" placeholder="Max Price">
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="bedroom_count" class="form-label">Bedroom Count</label>
                    <input type="number" id="bedroom_count" name="bedroom_count" class="form-control" placeholder="Bedroom Count">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="area-range" class="form-label">Area Range (sqft)</label>
                    <div class="input-group">
                        <input type="number" id="min_area" name="min_area" class="form-control" placeholder="Min Area">
                        <span class="input-group-text">-</span>
                        <input type="number" id="max_area" name="max_area" class="form-control" placeholder="Max Area">
                    </div>
                </div>
            </div>
            <div class="col-md-3 mt-3">
                <div class="input-group">
                    <button type="submit" class="btn btn-primary">Search</button>
                </div>
            </div>  
        </div>
    </form>

    <div class="row mt-4">
        @foreach($properties as $property)
        <div class="col-md-4" style="height: 45rem;">
            <div class="card mb-4">
                <div class="swiper-container main-slider">
                    <div class="swiper-wrapper">
                        @foreach ($property->images as $image)
                            <div class="swiper-slide"><img loading="lazy" src="{{  $image->url }}" alt=""></div>
                        @endforeach
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>

                <div class="swiper-container thumbnail-slider mt-2">
                    <div class="swiper-wrapper">
                        @foreach ($property->images as $image)
                            <div class="swiper-slide"><img loading="lazy" src="{{ $image->url }}" alt=""></div>
                        @endforeach
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{{ $property->project_name }}</h5>
                    <p class="card-text"> {{ Str::limit($property->short_title, 20) }}</p>
                    <p class="card-text"> <i class="fa-solid fa-dollar-sign"></i> ${{ $property->price }}</p>
                    <p class="card-text"> <i class="fa-solid fa-bed"></i> {{ $property->bedroom_count }}</p>
                    <p class="card-text"> <i class="fa-solid fa-house"></i> {{ $property->type }}</p>
                    <p class="card-text"> <i class="fa-regular fa-square"></i> {{ $property->area }} sqft</p>
                    <p class="card-text">{{ Str::limit($property->short_description, 40) }}</p>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    {{ $properties->appends(request()->query())->links() }}
@endsection