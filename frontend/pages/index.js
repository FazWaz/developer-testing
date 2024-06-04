import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Correct import for Swiper styles
import 'swiper/css/navigation';  // Import additional styles if needed, such as navigation

const GET_PROPERTIES = gql`
  query GetProperties($type: String, $minPrice: Int, $maxPrice: Int, $bedrooms: Int, $minArea: Int, $maxArea: Int) {
    properties(type: $type, minPrice: $minPrice, maxPrice: $maxPrice, bedrooms: $bedrooms, minArea: $minArea, maxArea: $maxArea) {
      id
      type
      price
      bedrooms
      area
      title
      description
      images
    }
  }
`;

export default function Home() {
  const [filters, setFilters] = useState({});
  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: filters,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Real Estate Properties</h1>
      <div>
        <label>
          Type:
          <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </label>
        <label>
          Price Range:
          <input type="number" placeholder="Min" onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) })} />
          <input type="number" placeholder="Max" onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })} />
        </label>
        <label>
          Bedrooms:
          <input type="number" onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) })} />
        </label>
        <label>
          Area Range:
          <input type="number" placeholder="Min" onChange={(e) => setFilters({ ...filters, minArea: parseInt(e.target.value) })} />
          <input type="number" placeholder="Max" onChange={(e) => setFilters({ ...filters, maxArea: parseInt(e.target.value) })} />
        </label>
      </div>
      <div>
        {data.properties.map((property) => (
          <div key={property.id}>
            <h2>{property.title}</h2>
            <p>{property.price}</p>
            <p>{property.bedrooms} Bedrooms</p>
            <p>{property.area} sq ft</p>
            <p>{property.description}</p>
            <Swiper>
              {property.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Property ${property.id}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
}
