'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '@/graphql/queries/GetProperties';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';

const Properties = ({searchData}) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [properties, setProperties] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    const { loading, error, data, refetch } = useQuery(GET_PROPERTIES, {
        variables: {
          keywords: searchData?.keywords,
          type:     searchData?.propertyType,
          priceMin: searchData?.priceMin,
          priceMax: searchData?.priceMax,
          bedroomCount: searchData?.bedroomCount,
          areaMin: searchData?.areaMin,
          areaMax: searchData?.areaMax,
          page,
          pageSize
        },
    });

    useEffect(() => {
      refetch();
      if (data && data.properties) {
        const properties = data?.properties?.properties;
        const total = data?.properties?.total;
        setProperties(properties);
        setTotalItems(total);
      }
    },[data, page, pageSize, refetch]);

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

  if (loading) return <Spinner/>;
  if (error) return <p className='text-red-500'>Error: {error.message}</p>;
  
  return (
    <section className='px-4 py-2'>
      <div className='container-xl lg:container m-auto px-4 py-3'>
        {properties.length === 0 ? (
          <div className='md:py-5 text-center'>
            <p className='text-2xl font-bold'>No properties found</p>
          </div>
        ) : (
          <div>
            <p className='pb-3'>Listing : {totalItems} properties</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
        {properties.length > 0 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};
export default Properties;
