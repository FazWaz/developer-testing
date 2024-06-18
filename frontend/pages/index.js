import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import Filters from "./components/filters";
import Properties from "./components/properties";

const GET_PROPERTIES = gql`
  query GetProperties(
    $type: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $minArea: Int
    $maxArea: Int
    $limit: Int
    $offset: Int
  ) {
    properties(
      type: $type
      minPrice: $minPrice
      maxPrice: $maxPrice
      bedrooms: $bedrooms
      minArea: $minArea
      maxArea: $maxArea
      limit: $limit
      offset: $offset
    ) {
      properties {
        id
        type
        price
        bedrooms
        area
        title
        description
        images
      }
      totalCount
    }
  }
`;

export default function Home() {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, loading, error, refetch } = useQuery(GET_PROPERTIES, {
    variables: { ...filters, limit: itemsPerPage, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch({ ...filters, limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage });
  }, [filters, currentPage, refetch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <Properties 
        data={data} 
        loading={loading} 
        error={error} 
        currentPage={currentPage} 
        itemsPerPage={itemsPerPage} 
        handlePageChange={handlePageChange} 
      />
    </div>
  );
}
