/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurants = /* GraphQL */ `
  mutation CreateRestaurants(
    $input: CreateRestaurantsInput!
    $condition: ModelRestaurantsConditionInput
  ) {
    createRestaurants(input: $input, condition: $condition) {
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
export const updateRestaurants = /* GraphQL */ `
  mutation UpdateRestaurants(
    $input: UpdateRestaurantsInput!
    $condition: ModelRestaurantsConditionInput
  ) {
    updateRestaurants(input: $input, condition: $condition) {
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
export const deleteRestaurants = /* GraphQL */ `
  mutation DeleteRestaurants(
    $input: DeleteRestaurantsInput!
    $condition: ModelRestaurantsConditionInput
  ) {
    deleteRestaurants(input: $input, condition: $condition) {
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
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
