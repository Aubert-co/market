'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    
    static associate(models) {
    Reviews.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'store',
        targetKey: 'id'
    });
    Reviews.belongsTo(models.Person, {
        foreignKey: 'requester_id',
        as: 'Person',
        targetKey: 'id'
    });
    Reviews.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'Product',
        targetKey: 'id'
    });
    }
  }
  Reviews.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imgPath:{
        type:DataTypes.STRING,
        allowNull:true
    },
    img_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
   
  }, {
    timestamps: true, 
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};