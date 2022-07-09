'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('itens', 'lista_id', {
      type: Sequelize.INTEGER,
      refereces: {model: 'listas', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lista_id')
  }
};
