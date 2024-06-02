'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Person, {
        foreignKey: 'user_id',
        as: 'person',
        sourceKey: 'id'
      });
      Cart.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
        sourceKey: 'id'
      });
    }
  }

  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      allowNull:false,
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    color: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    product_id: {
      type: DataTypes.INTEGER
    },
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
    modelName: 'Cart',
  });

  return Cart;
};
