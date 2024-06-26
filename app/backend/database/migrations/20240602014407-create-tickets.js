'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets',{
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
      },
      requester_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    
      },
      status: {
        type: Sequelize.ENUM('open', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'open'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        
      }
  
    });
  
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};
