export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.BIGINT,
      defaultValue: 1
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role"');
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM,
      values: [
        'Developer',
        'QA',
        'Maintenance',
      ],
      allowNull: true
    });
  }
};
