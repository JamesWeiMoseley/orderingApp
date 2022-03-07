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
      restaurant
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
      restaurant
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
      restaurant
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const createCart = /* GraphQL */ `
  mutation CreateCart(
    $input: CreateCartInput!
    $condition: ModelCartConditionInput
  ) {
    createCart(input: $input, condition: $condition) {
      id
      username
      restaurant
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const updateCart = /* GraphQL */ `
  mutation UpdateCart(
    $input: UpdateCartInput!
    $condition: ModelCartConditionInput
  ) {
    updateCart(input: $input, condition: $condition) {
      id
      username
      restaurant
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteCart = /* GraphQL */ `
  mutation DeleteCart(
    $input: DeleteCartInput!
    $condition: ModelCartConditionInput
  ) {
    deleteCart(input: $input, condition: $condition) {
      id
      username
      restaurant
      food
      price
      createdAt
      updatedAt
    }
  }
`;
