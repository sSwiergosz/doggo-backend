module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        },
      },
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      as: 'messages',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };

  return Message;
};
