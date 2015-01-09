"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUnique: function(value, next) {
          User.find({
            where: { username: value },
            attributes: ['id']
          }).done(function(error,user) {
            if (error) {
              return next(error)
            }
            if (user) {
              return next('Username is already in use!')
            }
            next()
          })
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};