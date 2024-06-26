'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart, {
        foreignKey: 'product_id',
        as: 'carts',
        sourceKey: 'id'

      });
      Product.hasMany(models.Views,{
        foreignKey:'id',
        as:'views'
      })

      Product.hasMany(models.Tickets,{
        foreignKey:'product_id',
        as:'Tickets'
      })
      Product.belongsTo(models.Store,{
        foreignKey:'store_id',
        as:'store',
        sourceKey:'id'
      })
      
    }
    
  };
  
  Product.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    store_id:{
      type:DataTypes.STRING,
      allowNull:false
    },
    color:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    imgPath:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    img_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    sexo:{
        type:DataTypes.STRING
    },
    size:{
        type:DataTypes.STRING
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
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
    timestamps:true,
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
