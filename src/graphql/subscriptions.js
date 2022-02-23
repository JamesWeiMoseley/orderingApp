/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurants = /* GraphQL */ `
  subscription OnCreateRestaurants {
    onCreateRestaurants {
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
export const onUpdateRestaurants = /* GraphQL */ `
  subscription OnUpdateRestaurants {
    onUpdateRestaurants {
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
export const onDeleteRestaurants = /* GraphQL */ `
  subscription OnDeleteRestaurants {
    onDeleteRestaurants {
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
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      food
      price
      createdAt
      updatedAt
    }
  }
`;
