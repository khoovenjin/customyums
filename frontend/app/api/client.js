import { ApolloClient, InMemoryCache } from '@apollo/client';

import { BASE_URL } from "@env";

const graphQLClient = new ApolloClient({
  uri: `${ BASE_URL }`,
  cache: new InMemoryCache(),
});

export default graphQLClient;