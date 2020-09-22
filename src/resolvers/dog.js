import { combineResolvers } from 'graphql-resolvers';
import {
  isAuthenticated,
  isDogOwner,
} from './authorization';

export default {
  Query: {
    async allDogs(root, args, { models }) {
      return models.Dog.findAll();
    },
    async dog(root, { id }, { models }) {
      return models.Dog.findByPk(id);
    },
  },

  Mutation: {
    createDog: combineResolvers(
      isAuthenticated,
      (root, { dog }, { models, authenticatedUser }) => {
        const { id: userId } = authenticatedUser;
        const {
          age,
          breed,
          name,
        } = dog;

        return models.Dog.create({
          age,
          breed,
          name,
          userId,
        });
      },
    ),
    deleteDog: combineResolvers(
      isAuthenticated,
      isDogOwner,
      (root, { id }, { models }) => models.Dog.destroy({ where: { id } }),
    ),
    updateDog: combineResolvers(
      isAuthenticated,
      isDogOwner,
      async (root, { dog }, { models }) => {
        const { dogId } = dog;
        const singleDog = await models.Dog.findByPk(dogId);

        return singleDog.update(dog);
      },
    ),
  },

  Dog: {
    async user(dog, args, { models }) {
      return models.User.findByPk(dog.userId);
    },
  },
};
