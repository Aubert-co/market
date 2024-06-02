'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reviews',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id:{
        type: Sequelize.INTEGER,
        allowNull:true
      },
   
      comments: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      imgPath:{
        type:Sequelize.STRING,
        allowNull:true
      },
      img_name:{
        type:Sequelize.STRING,
        allowNull:true
      },
      requester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
   
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
    
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};
