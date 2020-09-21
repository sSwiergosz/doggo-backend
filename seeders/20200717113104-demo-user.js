module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    createdAt: new Date(),
    email: 'example@example.com',
    name: 'John',
    password: 'testtest',
    updatedAt: new Date(),
  }]),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
