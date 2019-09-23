
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    locationName: {
      type: Sequelize.STRING
    },
    locationAddress: {
      type: Sequelize.TEXT,
      required: true
    },
    createdAt: {
      type: Sequelize.DATE,
      required: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      required: true
    }
  }),
  down: queryInterface => queryInterface.dropTable('Locations')
};
