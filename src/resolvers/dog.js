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
    async createDog(root, {
      age,
      breed,
      name,
      userId,
    }, { models }) {
      return models.Dog.create({
        age,
        breed,
        name,
        userId,
      });
    },
  },

  Dog: {
    async user(dog) {
      return dog.getUser();
    },
  },
};
