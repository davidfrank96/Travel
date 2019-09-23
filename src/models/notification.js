
export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    tripId: {
      type: DataTypes.STRING,
      required: true
    },
    lineManager: {
      type: DataTypes.INTEGER,
      required: true
    },
    userId: {
      type: DataTypes.STRING,
      required: true
    },
    isViewed: {
      type: DataTypes.BOOLEAN,
      required: true
    },
    content: {
      type: DataTypes.STRING,
      required: true
    },
    type: {
      type: DataTypes.STRING,
      required: true
    }
  }, {});
  Notifications.associate = (models) => {
    // associations can be defined here
    Notifications.belongsTo(models.Requests, {
      foreignKey: 'tripId'
    });
    Notifications.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };

  return Notifications;
};
