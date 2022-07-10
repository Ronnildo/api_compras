'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('itens', 'lista_id', {
      type: Sequelize.INTEGER,
      references: {model: 'listas', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', 
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lista_id');
  }
};
