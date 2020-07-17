module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'messages',
    });

    User.hasMany(models.Dog, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'dogs',
    });
  };

  return User;
};
