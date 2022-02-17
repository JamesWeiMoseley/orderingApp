/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurants = /* GraphQL */ `
  mutation CreateRestaurants(
    $input: CreateRestaurantsInput!
    $condition: ModelRestaurantsConditionInput
  ) {
    createRestaurants(input: $input, condition: $condition) {
      id
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
      title
      type
      createdAt
      updatedAt
    }
  }
`;
