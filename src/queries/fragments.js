import gql from "graphql-tag";

export const COMMON_PRODUCT_FRAGMENT = gql`
fragment CommonProductInfo on Product {
  id
  name
  thumbnail
  brandName
}
`;