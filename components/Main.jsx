'use client';
import { useState } from 'react';
import Properties from '@/components/Properties';
import SearchForm from '@/components/SearchForm';
import FilterForm from '@/components/FilterForm';

export default function Home() {
  const [showFilter, setShowFilter] = useState(false);
  const [searchData, setSearchData] = useState(
    { 
      keywords: '',
      propertyType: 'All' , 
      priceMin: 1000, 
      priceMax: 10000000,
      areaMin: 500,
      areaMax: 5000,
      bedroomCount: 0
     });

  const handleSearch = (data) => {
    setShowFilter(true);
    setSearchData(prevState => ({
      ...prevState,
      ...data
    }));
  };

  const handlePriceRangeFilter = (range) => {
    setSearchData(prevState => ({
      ...prevState,
        priceMin: range[0],
        priceMax: range[1]
    }));
  }

  const handleAreaRangeFilter = (range) => {
    setSearchData(prevState => ({
      ...prevState,
        areaMin: range[0],
        areaMax: range[1]
    }));
  }

  const handleBedroomCountFilter = (count) => {
    setSearchData(prevState => ({
      ...prevState,
      bedroomCount: count
    }));
  }

  return (
    <div>
      <div className='bg-blue-700 py-10 mb-4'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-white sm:text-5xl md:text-5xl'>
              Find The Perfect Rental
            </h2>
            <p className='my-4 text-xl text-white'>
              Discover the perfect property that suits your needs.
            </p>
          </div>
          <SearchForm onSearch={handleSearch} />
          {showFilter && 
          <FilterForm 
            searchData={searchData} 
            handlePriceFilter={handlePriceRangeFilter}
            handleAreaFilter={handleAreaRangeFilter}
            handleBedroomFilter = {handleBedroomCountFilter}
          />}
        </div>
      </div>
      <Properties searchData={searchData}/>
    </div>
  );
}
