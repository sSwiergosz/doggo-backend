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
      (root, { message }, { models, authenticatedUser }) => {
        const { text } = message;
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
    updateMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (root, { message }, { models }) => {
        const {
          messageId,
          text,
        } = message;
        const singleMessage = await models.Message.findByPk(messageId);

        return singleMessage.update({ text });
      },
    ),
  },

  Message: {
    async user(message, args, { models }) {
      return models.User.findByPk(message.userId);
    },
  },
};
