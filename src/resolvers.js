import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Product {
    isLiked: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;

export const resolvers = {
  Product: {
    isLiked: (product, _, cache) => {
      
    }
  }
};