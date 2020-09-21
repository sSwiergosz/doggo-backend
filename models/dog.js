module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    name: DataTypes.STRING,
  });

  Dog.associate = (models) => {
    Dog.belongsTo(models.User, {
      as: 'dogs',
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });
  };

  return Dog;
};
