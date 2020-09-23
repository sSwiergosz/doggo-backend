import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from '../models/index';

const app = express();

app.use(cors());

const getAuthenticatedUser = (req) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }

  return false;
};

const server = new ApolloServer({
  context: ({ req }) => {
    const authenticatedUser = getAuthenticatedUser(req);

    return {
      models,
      authenticatedUser,
      secret: process.env.SECRET,
    };
  },
  resolvers,
  typeDefs: schema,
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`));
