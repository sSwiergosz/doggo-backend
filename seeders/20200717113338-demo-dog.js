module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Dogs', [{
    age: 1,
    breed: 'NSDTR',
    createdAt: new Date(),
    name: 'Vraska',
    updatedAt: new Date(),
    userId: 1,
  }]),

  down: async (queryInterface) => queryInterface.bulkDelete('Dogs', null, {}),
};
