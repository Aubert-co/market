'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      Person.hasMany(models.Cart, {
        foreignKey: 'id',
        as: 'carts',
      });
      Person.hasMany(models.Reviews, {
        foreignKey: 'id',
        as: 'reviews',
      });
      Person.hasMany(models.Store, {
        foreignKey: 'id',
        as: 'store',
      });
      Person.hasMany(models.Status,{
        foreignKey:'id',
        as:'Status'
      })
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

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};