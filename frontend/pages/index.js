import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container">
      <h1 className="my-4">Real Estate Properties</h1>
      <div className="mb-4">
        <div className="form-group">
          <label>Type:</label>
          <select className="form-control" onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price Range:</label>
          <input className="form-control" type="number" placeholder="Min" onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) })} />
          <input className="form-control" type="number" placeholder="Max" onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })} />
        </div>
        <div className="form-group">
          <label>Bedrooms:</label>
          <input className="form-control" type="number" onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) })} />
        </div>
        <div className="form-group">
          <label>Area Range:</label>
          <input className="form-control" type="number" placeholder="Min" onChange={(e) => setFilters({ ...filters, minArea: parseInt(e.target.value) })} />
          <input className="form-control" type="number" placeholder="Max" onChange={(e) => setFilters({ ...filters, maxArea: parseInt(e.target.value) })} />
        </div>
      </div>
      <div>
        {data.properties.map((property) => (
          <div key={property.id} className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{property.title}</h2>
              <p className="card-text">{property.price}</p>
              <p className="card-text">{property.bedrooms} Bedrooms</p>
              <p className="card-text">{property.area} sq ft</p>
              <p className="card-text">{property.description}</p>
              <Swiper>
                {property.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`Property ${property.id}`} className="img-fluid" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
