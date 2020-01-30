import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// fix for: https://github.com/jhen0409/react-native-debugger/issues/432#issuecomment-569184047
import unfetch from 'unfetch';

import { resolvers, typeDefs } from "./resolvers";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://35.232.31.15:4000/",
  fetch: unfetch,
});

export const client = new ApolloClient({
  cache,
  link,
  // typeDefs,
  // resolvers,
});
