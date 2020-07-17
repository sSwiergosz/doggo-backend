import bcrypt from 'bcryptjs';

export default {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
  },

  Mutation: {
    async createUser(root, {
      email,
      name,
      password,
    }, { models }) {
      return models.User.create({
        email,
        name,
        password: await bcrypt.hash(password, 10),
      });
    },
  },

  User: {
    async dogs(user) {
      return user.getDogs();
    },
    async messages(user) {
      return user.getMessages();
    },
  },
};
