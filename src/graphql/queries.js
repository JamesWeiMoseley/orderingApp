/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurants = /* GraphQL */ `
  query GetRestaurants($id: ID!) {
    getRestaurants(id: $id) {
      id
      title
      type
      createdAt
      updatedAt
    }
  }
`;
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
