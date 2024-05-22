import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
  query GetProperties(
    $keywords: String,
    $type: String,
    $priceMin: Float,
    $priceMax: Float,
    $bedroomCount: Int,
    $areaMin: Float,
    $areaMax: Float,
    $page: Int,
    $pageSize: Int
  ) {
    properties(
      keywords: $keywords,
      type: $type,
      priceMin: $priceMin,
      priceMax: $priceMax,
      bedroomCount: $bedroomCount,
      areaMin: $areaMin,
      areaMax: $areaMax,
      page: $page,
      pageSize: $pageSize
    ) {
      properties {
        id
        type
        project_name
        short_title
        price
        bedroom_count
        area
        short_description
        images
      }
      total
    }
  }
`;
