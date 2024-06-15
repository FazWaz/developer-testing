import { useState, ChangeEvent } from 'react';
import { gql, useQuery } from '@apollo/client';
import client from '../lib/apollo-client';

const GET_PROPERTIES = gql`
  query GetProperties($listingType: String, $minPrice: Int, $maxPrice: Int, $bedrooms: Int, $minArea: Int, $maxArea: Int) {
    properties(listingType: $listingType, minPrice: $minPrice, maxPrice: $maxPrice, bedrooms: $bedrooms, minArea: $minArea, maxArea: $maxArea) {
      id
      projectName
      title
      price
      bedrooms
      area
      description
      mainImageUrl
      gallery {
        id
        imageUrl
      }
    }
  }
`;

interface Property {
  id: number;
  projectName: string;
  title: string;
  price: number;
  bedrooms: number;
  area: number;
  description: string;
  mainImageUrl: string;
  gallery: { id: number; imageUrl: string }[];
}

interface Filters {
  listingType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  minArea: number;
  maxArea: number;
}

const Search = () => {
  const [filters, setFilters] = useState<Filters>({
    listingType: '',
    minPrice: 0,
    maxPrice: 0,
    bedrooms: 0,
    minArea: 0,
    maxArea: 0,
  });

  const { data, loading, error } = useQuery<{ properties: Property[] }>(GET_PROPERTIES, {
    variables: { ...filters },
    client,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Search Properties</h1>
      <form>
        <input type="text" name="listingType" placeholder="Listing Type" onChange={handleChange} />
        <input type="number" name="minPrice" placeholder="Min Price" onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
        <input type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
        <input type="number" name="minArea" placeholder="Min Area" onChange={handleChange} />
        <input type="number" name="maxArea" placeholder="Max Area" onChange={handleChange} />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {data.properties.map((property) => (
            <div key={property.id}>
              <h2>{property.projectName}</h2>
              <p>{property.title}</p>
              <p>{property.price}</p>
              <p>{property.bedrooms} bedrooms</p>
              <p>{property.area} sq. ft.</p>
              <p>{property.description}</p>
              <img src={property.mainImageUrl} alt={property.title} />
              <div>
                {property.gallery.map((image) => (
                  <img key={image.id} src={image.imageUrl} alt={`${property.title} gallery`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
