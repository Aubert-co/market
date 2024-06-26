'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    
    static associate(models) {
   
      Tickets.belongsTo(models.Person, {
        foreignKey: 'requester_id',
        as: 'Person',
       
    });
    Tickets.belongsTo(models.Store, {
        foreignKey: 'store_id',
        as: 'Store',
    
    });
    Tickets.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'Product',
  
    });
    Tickets.hasMany(models.Reviews,{
      foreignKey:'ticket_id',
      as:'Reviews'
    })

  }
    
  }
  Tickets.init({
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
        allowNull:false
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
    modelName: 'Tickets',
  });
  return Tickets;
};