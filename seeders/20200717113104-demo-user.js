module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    name: 'John',
    email: 'example@example.com',
    password: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
