import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';

const createToken = (user, secret, expiresIn) => {
  const { email, id, name } = user;

  return jwt.sign(
    {
      id,
      email,
      name,
    },
    secret,
    { expiresIn },
  );
};

export default {
  Query: {
    async allUsers(root, args, { models }) {
      return models.User.findAll();
    },
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
  },

  Mutation: {
    signIn: async (root, { name, password }, { models, secret }) => {
      const user = await models.User.findByLogin(name);
      let isValid;

      if (user) {
        const { password: currentPassword } = user;
        isValid = await user.validatePassword(password, currentPassword);
      } else {
        throw new UserInputError('No user found with this login credentials.');
      }

      if (isValid) {
        return { token: createToken(user, secret, '30m') };
      }

      throw new AuthenticationError('Invalid password.');
    },
    signUp: async (root, { email, name, password }, { models, secret }) => {
      const SALT_ROUNDS = 10;
      const user = models.User.create({
        email,
        name,
        password: await bcrypt.hash(password, SALT_ROUNDS),
      });

      return { token: createToken(user, secret, '30m') };
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
