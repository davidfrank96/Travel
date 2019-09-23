export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    locationId: {
      type: DataTypes.INTEGER,
      required: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: 'Locations',
        key: 'id'
      }
    },
    accommodationName: {
      type: DataTypes.STRING,
      required: true,
    },
    accommodationAddress: {
      type: DataTypes.STRING,
      required: true,
    }
  }, {});
  Accommodation.associate = (models) => {
    // associations can be defined here
    Accommodation.belongsTo(models.Locations, {
      foreignKey: 'locationId',
      targetKey: 'id'
    });
  };
  return Accommodation;
};
