'use client';
import { useState, useEffect } from 'react';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterForm = ({handleAreaFilter, handlePriceFilter, handleBedroomFilter}) => {
  const PRICE_STEP = 100000;
  const AREA_STEP  = 50;
  const [price, setPrice] = useState([0.01, 100]);
  const [area, setArea] = useState([0.2, 100]);
  const [bedroom, setBedroom] = useState(0);

  const handlePriceRange = (range) => {
    setPrice(range);
    handlePriceFilter([price[0] * PRICE_STEP, price[1] * PRICE_STEP]);
  }

  const handleAreaRange = (range) => {
    setArea(range);
    handleAreaFilter([area[0] * AREA_STEP, area[1] * AREA_STEP]);
  }

  const handleBedroomCount = (count) =>{
    setBedroom(count);
    handleBedroomFilter(count);
  }

  const fullInt = (number) => {
    return Math.floor(number);
  }

  return (
    <>
      <div className='mt-4 mx-auto max-w-4xl w-full items-center border rounded-2xl pt-2 p-5  text-white'>
        <h3 className='text-center mb-4'>Advanced Filter</h3>
        <div className='flex flex-wrap -mx-2'>
          <div className='w-full md:w-2/6 my-4 md:mb-0 md:pr-5'>
            <label htmlFor='priceRange' className='text-center'>
              Price range [ {fullInt(price[0] * PRICE_STEP)} - {fullInt(price[1] * PRICE_STEP)} ]
            </label>
            <RangeSlider 
              id='priceRange' 
              value={price}
              step={0.02}
              onInput={handlePriceRange}
              defaultValue={price}
              className='mt-3 bg-orange-500'/>
          </div>
          <div className='w-full md:w-2/6 my-4 md:mb-0 md:pr-5'>
            <label htmlFor='areaRange' className='text-center'>
              Area range [ {fullInt(area[0] * AREA_STEP) } - {fullInt(area[1] * AREA_STEP)} ]
            </label>
            <RangeSlider 
              id='areaRange' 
              value={area} 
              step={0.2}
              onInput={handleAreaRange} 
              className='mt-3'/>
          </div>
          <div className='w-full md:w-2/6 my-4 md:mb-0 md:pr-1'>
            <label htmlFor='bedroomRange' className='text-center'>
              Bedroom Count
            </label>
            <div className=''>
              <label className='inline-flex items-center mr-3'>
                <input type='radio' name='bedroom_count' className='form-radio h-5 w-5 text-blue-600 hover:cursor-pointer' onChange={ ()=>handleBedroomCount(0) } checked={bedroom === 0} />
                <span className='ml-1'>All</span>
              </label>
              <label className='inline-flex items-center mr-3'>
                <input type='radio' name='bedroom_count' className='form-radio h-5 w-5 text-blue-600 hover:cursor-pointer' onChange={ ()=>handleBedroomCount(1) } checked={bedroom === 1} />
                <span className='ml-1'>1</span>
              </label>
              <label className='inline-flex items-center mr-3'>
                <input type='radio' name='bedroom_count' className='form-radio h-5 w-5 text-blue-600 hover:cursor-pointer' onChange={ ()=>handleBedroomCount(2) } checked={bedroom === 2} />
                <span className='ml-1'>2</span>
              </label>
              <label className='inline-flex items-center mr-3'>
                <input type='radio' name='bedroom_count' className='form-radio h-5 w-5 text-blue-600 hover:cursor-pointer' onChange={ ()=>handleBedroomCount(3) } checked={bedroom === 3} />
                <span className='ml-1'>3</span>
              </label>
              <label className='inline-flex items-center mr-3'>
                <input type='radio' name='bedroom_count' className='form-radio h-5 w-5 text-blue-600 hover:cursor-pointer' onChange={ ()=>handleBedroomCount(4) } checked={bedroom === 4} />
                <span className='ml-1'>4</span>
              </label>
              <label className='inline-flex items-center mr-3'>
                <input type='radio' name='bedroom_count' className='form-radio h-5 w-5 text-blue-600 hover:cursor-pointer' onChange={ ()=>handleBedroomCount(5) } checked={bedroom === 5} />
                <span className='ml-1'>5</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterForm;
