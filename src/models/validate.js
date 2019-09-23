
export default (sequelize, DataTypes) => {
  const Validate = sequelize.define('Validate', {
    userId: DataTypes.UUID,
    token: DataTypes.STRING
  }, {});
  Validate.associate = models => {
    Validate.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Validate;
};
