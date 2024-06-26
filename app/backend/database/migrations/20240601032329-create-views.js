'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Views', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    store_id: {
      type: Sequelize.INTEGER,
      allowNull:true
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull:true
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Views');
  }
};
