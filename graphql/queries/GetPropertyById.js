import { gql } from '@apollo/client';
export const GET_PROPERTY_BY_ID = gql`
  query GetPropertyById($id: ID!) {
    property(id: $id) {
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
  }
`;