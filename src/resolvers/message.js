import { combineResolvers } from 'graphql-resolvers';
import {
  isAuthenticated,
  isMessageOwner,
} from './authorization';

export default {
  Query: {
    async allMessages(root, args, { models }) {
      return models.Message.findAll();
    },
    async message(root, { id }, { models }) {
      return models.Message.findByPk(id);
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      (root, { text }, { models, authenticatedUser }) => {
        const { id: userId } = authenticatedUser;

        return models.Message.create({
          text,
          userId,
        });
      },
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      (root, { id }, { models }) => models.Message.destroy({ where: { id } }),
    ),
  },

  Message: {
    async user(message, args, { models }) {
      return models.User.findByPk(message.userId);
    },
  },
};
