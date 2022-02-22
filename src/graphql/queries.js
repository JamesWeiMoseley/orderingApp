/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurants = /* GraphQL */ `
  query GetRestaurants($id: ID!) {
    getRestaurants(id: $id) {
      id
      username
      title
      type
      items {
        id
        food
        price
        createdAt
        updatedAt
      }
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
        username
        title
        type
        items {
          id
          food
          price
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        food
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
