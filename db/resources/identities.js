const chance = require('../../lib/chance');
const { hashSync } = require('bcryptjs');
const { randomUsername } = require('../../functions');

module.exports = async () => {
  const roles = ['admin', 'client'];

  return [
    {
      email: 'ionela@email.com',
      name: 'Ionela Despa',
      password: hashSync('supersecretpassword'),
      role: 'admin',
      username: 'ioneladsp',
    },
    {
      email: 'ana@email.com',
      name: 'Ana Popescu',
      password: hashSync('supersecretpassword'),
      role: 'client',
      username: 'anapop',
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: randomUsername(),
    },
    {
      email: chance.email(),
      name: chance.name(),
      password: hashSync('supersecretpassword'),
      role: chance.pickone(roles),
      username: randomUsername(),
    },
  ];
};
