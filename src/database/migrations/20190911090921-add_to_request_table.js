export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Requests', 'accommodation', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },
  down: async (queryInterface) => {
    queryInterface.removeColumn('Requests', 'accommodation');
  }
};
