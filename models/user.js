module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
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
