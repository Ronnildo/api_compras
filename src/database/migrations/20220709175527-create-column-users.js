'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users',"lista_id",
       {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'listas', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: "SET NULL",
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lista_id');
  }
};
