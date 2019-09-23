
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accommodation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    locationId: {
      type: Sequelize.INTEGER,
      required: true
    },
    accommodationName: {
      type: Sequelize.TEXT,
      required: true
    },
    accommodationAddress: {
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
  down: queryInterface => queryInterface.dropTable('Accommodation')
};
