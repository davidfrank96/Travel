export default (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    roleName: DataTypes.STRING,
    rolePermissions: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  roles.associate = () => {

  };
  return roles;
};
