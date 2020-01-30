import gql from 'graphql-tag';

import { COMMON_PRODUCT_FRAGMENT } from "./fragments";

export const GET_PRODUCTS = gql`
  query getAllProducts($brandNames: [String!]) {
    products(where: {
      brandName_in: $brandNames
    }) {
      ...CommonProductInfo
    }
  }
  ${COMMON_PRODUCT_FRAGMENT}
`;

export const GET_FAVORITE_PRODUCTS = gql`
  query getFavoriteProducts($productIds: [ID!]) {
    products(where: {
      id_in: $productIds
    }) {
      ...CommonProductInfo
    }
  }
  ${COMMON_PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BRANDS = gql`
  query getProductBrands {
    products {
      brandName
      brand {
        banner
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(where: {
      id: $productId
    }) {
      ...CommonProductInfo
      description
      brand {
        description
      }
    }
  }
  ${COMMON_PRODUCT_FRAGMENT}
`;
