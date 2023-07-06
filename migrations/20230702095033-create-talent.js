"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Talents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      talent_name: {
        type: Sequelize.STRING,
      },
      talent_image_path: {
        type: Sequelize.STRING,
      },
      talent_summary: {
        type: Sequelize.TEXT,
      },
      work_since: {
        type: Sequelize.DATE,
      },
      education: {
        type: Sequelize.TEXT,
      },
      cv_file_path: {
        type: Sequelize.STRING,
      },
      working_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Talents");
  },
};
