import { ApolloClient, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { InMemoryCache } from '@apollo/client/cache';

import { createUploadLink } from 'apollo-upload-client'

const uri = process.env.REACT_APP_GRAPHQL_URL;

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
    console.log({ graphQLErrors });
    console.log({ response });
  
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path, extensions }) => {
        if (extensions && extensions.code === 'UNAUTHENTICATED') {
          localStorage.removeItem('token');
          // edit response so downstream can cat an error message
          response.errors = [new Error('UNAUTHENTICATED')];
        }
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  
  const link = from([
    authLink,
    errorLink,
    createUploadLink({
        uri
    }),
    new HttpLink({
      uri,
      credentials: 'include'
    }),
  ]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore'
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    }
});

export default client;