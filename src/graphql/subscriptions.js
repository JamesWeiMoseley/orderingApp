/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurants = /* GraphQL */ `
  subscription OnCreateRestaurants {
    onCreateRestaurants {
      id
      username
      title
      type
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      restaurant
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
      restaurant
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
      restaurant
      food
      price
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCart = /* GraphQL */ `
  subscription OnCreateCart {
    onCreateCart {
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
export const onUpdateCart = /* GraphQL */ `
  subscription OnUpdateCart {
    onUpdateCart {
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
export const onDeleteCart = /* GraphQL */ `
  subscription OnDeleteCart {
    onDeleteCart {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      username
      restaurant
      price
      items
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      username
      restaurant
      price
      items
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      username
      restaurant
      price
      items
      createdAt
      updatedAt
    }
  }
`;
