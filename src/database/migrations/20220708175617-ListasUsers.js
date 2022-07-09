'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('listasUsers', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      lista_id: {
        type: Sequelize.INTEGER,
        references: {model: 'listas', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('listasUsers');
  }
};
