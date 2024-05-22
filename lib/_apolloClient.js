import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql', // Replace with your GraphQL server URL
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
    console.log('===========_apolloClient Status==========');
    console.log(_apolloClient);
    console.log('====================================');
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache with the merged data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  console.log('=============initialState=============');
  console.log(initialState);
  console.log('====================================');
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
