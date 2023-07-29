import cors from "cors";
import express from "express";
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';

import {
  dietaryRouter,
  pantryRouter,
  userRouter
} from './routes/index.js';
import GraphQLServer from "./graphql/graphql.js";
import * as Controllers from "./controllers/index.js";
import { payloadChecker } from "./middleware/payloadChecker.js";

export default class Server {
  constructor() {
    this.app = express();
    this.httpServer = http.createServer( this.app );
    this.graphQLServer = GraphQLServer( this.httpServer );
  }

  getExpress = () => this.app;
  getHttpServer = () => this.httpServer;
  getGraphQLServer = () => this.graphQLServer;

  parseReq = ( id ) => {
    return {
      params: {
        id
      }
    }
  }

  init = async () => {
    this.app.use(cors());
    this.app.use(express.json());
    
    this.app.use("/api/v1", dietaryRouter);
    this.app.use("/api/v1", pantryRouter);
    this.app.use("/api/v1", userRouter);
  
    try {
      await this.graphQLServer.start();
    } catch (error) {
      console.log('Unable to start GraphQL server: ', error);
    }
  
    this.app.use(
      '/graphql',
      expressMiddleware( this.graphQLServer, {
        context: async ({ req, res }) => ({
          controllers: Controllers,
          middleware: {
            utils: payloadChecker
          },
        })   
      })
    );
    
    return this.httpServer;
  }
};