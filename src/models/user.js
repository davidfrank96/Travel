export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      userId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        required: true
      },
      firstname: {
        type: DataTypes.STRING,
        required: true
      },
      lastname: {
        type: DataTypes.STRING,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        required: true
      },
      password: {
        type: DataTypes.STRING,
        required: false
      },
      phone: {
        type: DataTypes.STRING,
        required: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        required: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        required: false
      },
      notifyemail: {
        type: DataTypes.BOOLEAN,
        required: true
      },
      gmail: {
        type: DataTypes.STRING,
        required: false
      },
      facebook: {
        type: DataTypes.STRING,
        required: false
      },
      gender: {
        type: DataTypes.STRING,
        required: false
      },
      birthday: {
        type: DataTypes.DATE,
        required: false
      },
      preferredlanguage: {
        type: DataTypes.STRING,
        required: false
      },
      currency: {
        type: DataTypes.STRING,
        required: false
      },
      residentialaddress: {
        type: DataTypes.STRING,
        required: false
      },
      role: {
        type: DataTypes.BIGINT,
        required: false
      },
      department: {
        type: DataTypes.STRING,
        required: false
      },
      linemanager: {
        type: DataTypes.INTEGER,
        required: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
    },
    {}
  );
  Users.associate = (models) => {
    Users.hasMany(models.Requests,
      {
        foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'SET NULL'
      });
    Users.hasMany(models.Notifications, {
      foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'SET NULL'
    });
  };

  return Users;
};
