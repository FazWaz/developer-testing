import { gql } from 'graphql-tag'

const propertyFields = gql`
  fragment PropertyFields on Property {
    id
    name
    title
    description
    photosUrls
    bedroomCount
    priceFormatted
    listingType
    area
  }
`

export const FIND_PROPERTY = gql`
  query FindProperty($id: String!) {
    findProperty(id: $id) {
      ...PropertyFields
    }
  }
  ${propertyFields}
`

export const SEARCH_PROPERTY = gql`
  query SearchProperties($query: String!) {
    searchProperties(query: $query) {
      ...PropertyFields
    }
  }
  ${propertyFields}
`
export const RECOMMEND_PROPERTY = gql`
  query RecommendProperties {
    recommendProperties {
      ...PropertyFields
    }
  }
  ${propertyFields}
`

export const INTERACTED_PROPERTY = gql`
  mutation InteractedProperty($id: ID!) {
    interactedProperty(input: { id: $id }) {
      status
    }
  }
`

const api = {
  SEARCH_PROPERTY,
  RECOMMEND_PROPERTY,
  FIND_PROPERTY,
  INTERACTED_PROPERTY,
}

export default api
