'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('listas', 'user_id', {
      type: Sequelize.INTEGER,
      references: {model: 'users', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', 
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_id');
  }
};
