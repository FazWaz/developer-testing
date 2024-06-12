import { useState, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Modal from 'react-modal';
import styles from '../styles/Home.module.css';

const GET_PROPERTIES = gql`
  query GetProperties($type: String, $minPrice: Float, $maxPrice: Float, $bedrooms: Int, $minArea: Float, $maxArea: Float, $limit: Int, $offset: Int) {
    properties(type: $type, minPrice: $minPrice, maxPrice: $maxPrice, bedrooms: $bedrooms, minArea: $minArea, maxArea: $maxArea, limit: $limit, offset: $offset) {
      id
      name
      shortTitle
      price
      bedrooms
      area
      description
      images
      type
    }
  }
`;

const SliderComponent = dynamic(() => import('react-slick'), {
  ssr: false,
});

export default function Home() {
  const [filters, setFilters] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, loading, error, refetch } = useQuery(GET_PROPERTIES, {
    variables: { ...filters, limit, offset },
  });

  const debouncedSetFilters = useCallback(
    debounce((newFilters) => {
      setFilters(newFilters);
      refetch({ ...newFilters, limit, offset: 0 });
      setPage(1);
    }, 3000), 
    [setFilters, refetch]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: name === 'type' ? value : parseFloat(value) };
    debouncedSetFilters(newFilters);
  };

  const handleSearch = () => {
    refetch({ ...filters, limit, offset: 0 });
    setPage(1);
  };

  const openModal = (images) => {
    setSelectedImages(images);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImages([]);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch({ ...filters, limit, offset: (newPage - 1) * limit });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    touchMove: true,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Real Estate Properties</h1>
      <div className={styles.filtersContainer}>
        <div className={styles.filters}>
          <input
            type="text"
            name="type"
            placeholder="Type"
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="number"
            name="minArea"
            placeholder="Min Area"
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="number"
            name="maxArea"
            placeholder="Max Area"
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
      </div>
      <div className={styles.propertyList}>
        {data && data.properties.map(property => (
          <div key={property.id} className={styles.propertyItem}>
            <h2 className={styles.subtitle}>{property.name}</h2>
            <p>{property.shortTitle}</p>
            <p>Price: {property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Area: {property.area}</p>
            <p>Description: {property.description}</p>
            <p>Type: {property.type}</p>
            {property.images && property.images.length > 0 && (
              <div className={styles.imageContainer} onClick={() => openModal(property.images)}>
                <Image src={property.images[0]} alt={`Image ${property.name}`} width={500} height={300} loading="lazy" />
              </div>
            )}
          </div>
        ))}
      </div>
      {data && data.properties.length > 0 && (
        <div className={styles.pagination}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={data.properties.length < limit}>
            Next
          </button>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Property Images"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button onClick={closeModal} className={styles.closeButton}>Close</button>
        <SliderComponent {...settings}>
          {selectedImages.map((image, index) => (
            <div key={index} className={styles.imageContainer}>
              <Image src={image} alt={`Image ${index + 1}`} width={800} height={600} />
            </div>
          ))}
        </SliderComponent>
      </Modal>
    </div>
  );
}
