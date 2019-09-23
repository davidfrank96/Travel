import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Sylvanus',
        lastname: 'Elendu',
        email: 'sylvanus_elendu@andela.com',
        password: bcrypt.hashSync('IamUser$', 10),
        userId: uuidv4(),
        role: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidv4(),
        firstname: 'Stephen',
        lastname: 'Aribaba',
        email: 'stephen_aribaba@andela.com',
        password: bcrypt.hashSync('Jennylove19', 10),
        role: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidv4(),
        firstname: 'Chima',
        lastname: 'Ekeneme',
        email: 'sebastine.ekeneme@andela.com',
        password: bcrypt.hashSync('Qwertyuiop$', 10),
        role: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
