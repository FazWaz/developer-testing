"use client";
import { Listing } from '@/types/types';
import { useEffect, useState } from 'react';
import { getListings } from "../api/listings";
import PropertyCard from './PropertyCard';
import PropertyFilterForm from './PropertyFilterForm';

type Filters = {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minArea?: number;
  maxArea?: number;
};

const PropertyListings = () => {
  const [listings, setListings] = useState<Listing[]>();

  const fetchListings = async (filters: Filters) => {
    try {
      const data = await getListings(filters);
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings({});
  }, []);

  return (
    <>
      <div>
        <PropertyFilterForm onFilter={fetchListings} />
          <div className="grid sm:grid-cols-2 gap-2 my-14 -mx-2">
            {listings && listings.map((listing) => (
              <>
                <PropertyCard listing={listing} />
              </>
            ))}
          </div>
      </div>
    </>
  )
};

export default PropertyListings;