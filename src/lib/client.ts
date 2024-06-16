import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const getClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GRAPHQL_URI,
    }),
  });
}