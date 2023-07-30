import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./resolvers/index.js";
import { graphQL as middlewareGraphQL } from "../middleware/index.js";

const GraphQLServer = ( httpServer ) => new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
  formatError: middlewareGraphQL.resolveQueryError
});

export default GraphQLServer;