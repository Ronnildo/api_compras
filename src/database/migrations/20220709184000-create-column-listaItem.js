'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('listas',"iten_id",
    {
     type: Sequelize.INTEGER,
     allowNull: true,
     references: {model: 'itens', key: 'id'},
     onUpdate: 'CASCADE',
     onDelete: "SET NULL",
   },
 );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('iten_id');
  }
};
