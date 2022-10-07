'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn('Companies', 'taxId', {
        type: Sequelize.STRING(16),
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.changeColumn('Companies', 'phoneNumber', {
        type: Sequelize.STRING(16),
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.changeColumn('Companies', 'email', {
        type: Sequelize.STRING(32),
        allowNull: true,
      }, {
        transaction
      });

      await queryInterface.changeColumn('Companies', 'city', {
        type: Sequelize.STRING(32),
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.removeConstraint('Companies', 'taxId');
      await queryInterface.removeConstraint('Companies', 'phoneNumber');
      await queryInterface.removeConstraint('Companies', 'email');

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn('Companies', 'taxId', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, {
        transaction
      });

      await queryInterface.changeColumn('Companies', 'phoneNumber', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }, {
        transaction
      });

      await queryInterface.changeColumn('Companies', 'email', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      }, {
        transaction
      });

      await queryInterface.changeColumn('Companies', 'city', {
        type: Sequelize.STRING,
        allowNull: false,
      }, {
        transaction
      });

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
    }
  }
};
