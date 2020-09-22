import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (root, args, { authenticatedUser }) => (
  authenticatedUser ? skip : new ForbiddenError('Not authenticated')
);

export const isAdmin = combineResolvers(
  isAuthenticated,
  (root, args, { authenticatedUser: { role } }) => (role === 'ADMIN'
    ? skip
    : new ForbiddenError('Not an admin')),
);

export const isMessageOwner = async (
  root,
  { id },
  { models, authenticatedUser },
) => {
  const message = await models.Message.findByPk(id, { raw: true });
  const { userId } = message;
  const { id: authentiactedUserId } = authenticatedUser;

  if (userId === authentiactedUserId) {
    return skip;
  }

  throw new ForbiddenError('Not an owner');
};
