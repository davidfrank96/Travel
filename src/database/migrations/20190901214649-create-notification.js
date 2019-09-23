export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    userId: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'userId'
      },
      allowNull: false
    },
    lineManager: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tripId: {
      type: Sequelize.STRING,
      references: {
        model: 'Requests',
        key: 'tripId'
      }
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isViewed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Notifications')
};
