'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('itens', 'user_id', {
      type: Sequelize.INTEGER,
      refereces: {model: 'user', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_id')
  }
};
