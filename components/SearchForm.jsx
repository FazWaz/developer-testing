'use client';
import { useState } from 'react';

const SearchForm = ({ onSearch }) => {

  const [keywords, setKeywords] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keywords, propertyType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-1 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'
    >
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0'>
        <label htmlFor='projectName' className='sr-only'>
          Project Name
        </label>
        <input
          type='text'
          id='projectName'
          placeholder='Enter keywords or project name'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <div className='w-full md:w-2/5 md:pl-2'>
        <label htmlFor='property-type' className='sr-only'>
          Property Type
        </label>
        <select
          id='property-type'
          className='w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500'
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value='All'>All</option>
          <option value='Rent'>Rent</option>
          <option value='Sale'>Sale</option>
        </select>
      </div>
      <button
        type='submit'
        className='md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
      >
        Search
      </button>
    </form>
  );
};
export default SearchForm;
