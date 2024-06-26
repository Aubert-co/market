'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews',{
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
    
      comments: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      imgPath:{
        type:Sequelize.STRING,
        allowNull:true
      },
      img_name:{
        type:Sequelize.STRING,
        allowNull:true
      },
     
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
    
  

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
