'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    
    static associate(models) {
    Status.belongsTo(models.Person, {
        foreignKey: 'requester_id',
        as: 'Person',
        targetKey: 'id'
    });
    Status.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'Store',
        targetKey: 'id'
    });
    Status.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'Product',
        targetKey: 'id'
    });
    }
  }
  Status.init({
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
    requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
      type: DataTypes.ENUM('open', 'completed', 'cancelled'),
      allowNull:false,
      defaultValue:'open'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true ,
      defaultValue:DataTypes.now
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true 
    },
   
  }, {
    timestamps:true,
    sequelize,
    modelName: 'Status',
  });
  return Status;
};