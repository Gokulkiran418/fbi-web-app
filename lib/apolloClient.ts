import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloLink } from '@apollo/client/link/core';
import { onError } from '@apollo/client/link/error';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// HTTP link to GraphQL endpoint
const httpLink = new HttpLink({
  uri: '/api/graphql', // Points to Next.js API route
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // Cache first, then network
      errorPolicy: 'all', // Include both data and errors
    },
    query: {
      fetchPolicy: 'network-only', // Always fetch fresh data for static pages
      errorPolicy: 'all',
    },
  },
});

export default client;