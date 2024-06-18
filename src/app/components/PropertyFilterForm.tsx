// src/components/PropertyFilterForm.tsx
import React, { useState } from 'react';

type PropertyFilterFormProps = {
  onFilter: (filters: Filters) => void;
};

type Filters = {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minArea?: number;
  maxArea?: number;
};

const CustomTextbox = ({
  label,
  type,
  value,
  onChange,
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium leading-6">{label}</label>
        <div className='mt-2'>
          <input
            type={type}
            value={value}
            onChange={onChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
};

const PropertyFilterForm: React.FC<PropertyFilterFormProps> = ({ onFilter }) => {
  const [type, setType] = useState<string | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [bedrooms, setBedrooms] = useState<number | undefined>();
  const [minArea, setMinArea] = useState<number | undefined>();
  const [maxArea, setMaxArea] = useState<number | undefined>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const filters: Filters = {
      type,
      minPrice,
      maxPrice,
      bedrooms,
      minArea,
      maxArea,
    };
    onFilter(filters);
  };

  const handleClear = () => {
    setType("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setBedrooms(undefined);
    setMinArea(undefined);
    setMaxArea(undefined);
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium leading-6">
            Type
          </label>
          <div className="mt-2">
            <select
              id="type"
              name="type"
              value={type} onChange={(e) => setType(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="">All</option>
              <option value="SALE">Sale</option>
              <option value="RENT">Rent</option>
            </select>
          </div>
        </div>

        <CustomTextbox
          label="Min Price"
          type="number"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : undefined)}
        />

        <CustomTextbox
          label="Max Price"
          type="number"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : undefined)}
        />

        <CustomTextbox
          label="Bedrooms"
          type="number"
          value={bedrooms || ''}
          onChange={(e) => setBedrooms(e.target.value ? parseInt(e.target.value) : undefined)}
        />

        <CustomTextbox
          label="Min area"
          type="number"
          value={minArea || ''}
          onChange={(e) => setMinArea(e.target.value ? parseInt(e.target.value) : undefined)}
        />

        <CustomTextbox
          label="Max area"
          type="number"
          value={maxArea || ''}
          onChange={(e) => setMaxArea(e.target.value ? parseInt(e.target.value) : undefined)}
        />
      </div>
      <div className="flex gap-2 py-8">
        <button
          type="submit"
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex justify-center rounded-md bg-transparent ring-2 ring-zinc-200 dark:ring-zinc-800 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-800"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default PropertyFilterForm;
