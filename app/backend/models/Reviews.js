'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    
    static associate(models) {
    
    Reviews.belongsTo(models.Tickets, {
      foreignKey: 'ticket_id',
      as: 'Tickets',
   
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
   
    ticket_id:{
      type:DataTypes.INTEGER,
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

    createdAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
   
  }, {
    timestamps: true, 
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};