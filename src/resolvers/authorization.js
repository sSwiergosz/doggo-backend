import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

const isAuthenticated = (parent, args, { authenticatedUser }) => (
  authenticatedUser ? skip : new ForbiddenError('Not authenticated')
);

export default isAuthenticated;
