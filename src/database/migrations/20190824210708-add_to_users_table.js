export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'userId', {
      type: Sequelize.STRING
    }),
    queryInterface.addConstraint('Users', ['userId'], {
      type: 'primary key',
      name: 'user_id_primary_key_constraint'
    }),
    queryInterface.addConstraint('Users', ['userId'], {
      type: 'unique',
      name: 'unique_id_constraint'
    }),
    queryInterface.addColumn('Users', 'facebook', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'gmail', {
      type: Sequelize.STRING
    })
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Users', 'userId'),
    queryInterface.removeColumn('Users', 'facebook'),
    queryInterface.removeColumn('Users', 'gmail')
  ])
};
