export const LISTINGS_QUERY = `
  query {
    listings {
      id
      title
      description
      type
      price
      bedrooms
      area
      createdAt
      updatedAt
    }
  }
`;

const SEARCH_LISTINGS_QUERY = `
  query SearchListings(
    $type: String
    $minPrice: Float
    $maxPrice: Float
    $bedrooms: Int
    $minArea: Float
    $maxArea: Float
  ) {
    searchListings(
      type: $type
      minPrice: $minPrice
      maxPrice: $maxPrice
      bedrooms: $bedrooms
      minArea: $minArea
      maxArea: $maxArea
    ) {
      id
      title
      description
      type
      price
      bedrooms
      area
      images {
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`;


// export const getListings = async () => {
//   const response = await fetch('http://localhost:3000/api/graphql', {
//     method: 'POST',
//     next: { revalidate: 5 },
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: SEARCH_LISTINGS_QUERY,
//     }),
//   });

//   const result = await response.json();

//   if (!response.ok) {
//     console.error("Failed to fetch data:", result.errors);
//     throw new Error('Network response was not ok');
//   }

//   console.log("Data:", result.data.listings);
//   return result.data.listings;
// };

export const getListings = async (variables) => {
  const response = await fetch('http://localhost:3000/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SEARCH_LISTINGS_QUERY,
      variables: variables,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Failed to fetch data:", result.errors);
    throw new Error('Network response was not ok');
  }

  console.log("Data:", result.data.searchListings); // Ensure you access the correct field from result
  return result.data.searchListings;
};
