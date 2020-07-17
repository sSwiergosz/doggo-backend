module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    name: DataTypes.STRING,
  });

  Dog.associate = (models) => {
    Dog.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'dogs',
    });
  };

  return Dog;
};
