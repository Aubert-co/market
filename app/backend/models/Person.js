'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      Person.hasMany(models.Cart, {
        foreignKey: 'id',
        as: 'carts',
      });
      Person.hasMany(models.Store, {
        foreignKey: 'id',
        as: 'store',
      });
    }
  }
    Person.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },      
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};