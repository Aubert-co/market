'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Views extends Model {
    
    static associate(models) {
    Views.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'store',
        targetKey: 'id'
    });
    Views.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
        targetKey: 'id'
    });
    }
  }
  Views.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    store_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false 
    },
   
  }, {
    timestamps:true,
    sequelize,
    modelName: 'Views',
  });
  return Views;
};