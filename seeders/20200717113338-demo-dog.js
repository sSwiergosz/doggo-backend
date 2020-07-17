module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Dogs', [{
    name: 'Vraska',
    breed: 'NSDTR',
    age: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: async (queryInterface) => queryInterface.bulkDelete('Dogs', null, {}),
};
