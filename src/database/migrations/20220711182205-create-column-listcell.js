'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('listas', 'cell_id', {
      type: Sequelize.INTEGER,
      references: {model: 'cells', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', 
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cell_id');
  }
};