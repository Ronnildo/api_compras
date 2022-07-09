'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('listas',"user_id",
       {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: "SET NULL",
      },
    );
    await queryInterface.addColumn('listas',"item_id",
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
    await queryInterface.removeColumn('users_id');
  }
};
