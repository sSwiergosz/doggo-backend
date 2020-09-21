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
    async createMessage(root, { userId, text }, { models }) {
      return models.Message.create({ userId, text });
    },
  },

  Message: {
    async user(message) {
      return message.getUser();
    },
  },
};
