import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Sylvanus',
        lastname: 'Elendu',
        email: 'chidimma.okafor.c@gmail.com',
        password: bcrypt.hashSync('IamUser', 10),
        userId: uuidv4(),
        linemanager: 1,
        role: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidv4(),
        firstname: 'frank',
        lastname: 'chidinma',
        email: 'stephenibaba@andela.com',
        password: bcrypt.hashSync('Jennylove19', 10),
        role: '5',
        linemanager: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidv4(),
        firstname: 'frank',
        lastname: 'chidinma',
        email: 'frank@andela.com',
        password: bcrypt.hashSync('Jennylove19@', 10),
        role: '5',
        linemanager: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
