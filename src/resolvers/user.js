import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createToken = (user, secret, expiresIn) => {
  const {
    email,
    id,
    name,
  } = user;

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
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
  },

  Mutation: {
    signUp: async (
      root,
      { email, name, password },
      { models, secret },
    ) => {
      const user = models.User.create({
        email,
        name,
        password: await bcrypt.hash(password, 10),
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
