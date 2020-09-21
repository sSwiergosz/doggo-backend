import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    },
  });

  User.findByLogin = (login) => User.findOne({ where: { name: login } });

  User.prototype.validatePassword = (password, currentPassword) => (
    bcrypt.compare(password, currentPassword)
  );

  User.associate = (models) => {
    User.hasMany(models.Message, {
      as: 'messages',
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });

    User.hasMany(models.Dog, {
      as: 'dogs',
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });
  };

  return User;
};
