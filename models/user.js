module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [9]
      }
    }
  });

  // User.associate = function(models) {
  //   User.hasMany(models.Expense, {
  //     onDelete: "cascade"
  //   });
  // };

  return User;
};
