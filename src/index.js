import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from '../models/index';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    secret: process.env.SECRET,
  },
});

server.applyMiddleware({ app, path: '/graphql' });
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`));
