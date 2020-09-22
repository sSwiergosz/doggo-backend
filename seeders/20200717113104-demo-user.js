const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      createdAt: new Date(),
      email: 'example@example.com',
      name: 'John',
      password: await bcrypt.hash('testtest', SALT_ROUNDS),
      updatedAt: new Date(),
      role: 'ADMIN',
    },
    {
      createdAt: new Date(),
      email: 'example2@example.com',
      name: 'Szymon',
      password: await bcrypt.hash('testtest', SALT_ROUNDS),
      updatedAt: new Date(),
      role: 'USER',
    },
  ]),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
