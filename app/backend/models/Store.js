'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    
    static associate(models) {
      Store.belongsTo(models.Person, {
        foreignKey: 'user_id',
        as: 'person',
        sourceKey: 'id'
      });
      Store.hasMany(models.Product,  {
        foreignKey: 'id',
        as: 'product',
      });
      Store.hasMany(models.Views,{
        foreignKey:'id',
        as:'views'
      })
      Store.hasMany(models.Reviews,{
        foreignKey:'id',
        as:'reviews'
      })
      Store.hasMany(models.Status,{
        foreignKey:'id',
        as:'Status'
      })
    }
  }
  Store.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    imgPath: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    },

  }, {
    timestamps:true,
    sequelize,
    modelName: 'Store',
  });
  return Store;
};