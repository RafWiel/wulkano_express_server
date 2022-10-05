'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn('Clients', 'phoneNumber', {
        type: Sequelize.STRING(16),
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.changeColumn('Clients', 'email', {
        type: Sequelize.STRING(32),
        allowNull: true,
        unique: false,
      }, {
        transaction
      });

      await queryInterface.removeConstraint('Clients', 'email')

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
    }
  },
  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn('Clients', 'phoneNumber', {
        type: Sequelize.STRING,
        allowNull: false,
      }, {
        transaction
      });

      await queryInterface.changeColumn('Clients', 'email', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
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
