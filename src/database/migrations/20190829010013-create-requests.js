
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    tripId: {
      type: Sequelize.STRING,
      unique: true
    },
    userId: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    departureDate: {
      type: Sequelize.DATE,
    },
    returnDate: {
      type: Sequelize.DATE,
    },
    tripType: {
      type: Sequelize.STRING,
    },
    reason: {
      type: Sequelize.TEXT,
    },
    currentOfficeLocation: {
      type: Sequelize.INTEGER,
    },
    destination: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    },
    requestStatus: {
      type: Sequelize.STRING,
      required: true
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
  down: (queryInterface) => queryInterface.dropTable('Requests')
};
