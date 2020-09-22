import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { authenticatedUser }) => (
  authenticatedUser ? skip : new ForbiddenError('Not authenticated')
);

export const isMessageOwner = async (
  parent,
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
