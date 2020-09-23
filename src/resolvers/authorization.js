import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (root, args, { authenticatedUser }) => (
  authenticatedUser ? skip : new ForbiddenError('Not authenticated')
);

export const isAdmin = combineResolvers(
  isAuthenticated,
  (root, args, { authenticatedUser: { role } }) => (
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not an admin')
  ),
);

export const isDogOwner = async (
  root,
  {
    dog: {
      dogId,
    },
  },
  { models, authenticatedUser },
) => {
  const singleDog = await models.Dog.findByPk(dogId, { raw: true });
  const { userId } = singleDog;
  const { id: authentiactedUserId } = authenticatedUser;

  if (userId === authentiactedUserId) {
    return skip;
  }

  throw new ForbiddenError('Not an owner');
};

export const isMessageOwner = async (
  root,
  {
    message: {
      messageId,
    },
  },
  { models, authenticatedUser },
) => {
  const singleMessage = await models.Message.findByPk(messageId, { raw: true });
  const { userId } = singleMessage;
  const { id: authentiactedUserId } = authenticatedUser;

  if (userId === authentiactedUserId) {
    return skip;
  }

  throw new ForbiddenError('Not an owner');
};
