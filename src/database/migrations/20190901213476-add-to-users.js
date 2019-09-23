export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'notifyemail', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'notifyemail');
  }
};
