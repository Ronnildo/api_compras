const { Model } = require('sequelize');
const Sequelize = require("sequelize");

class listasUsers extends Model{
    static init(sequelize){
        super.init(
            {
                user_id: Sequelize.INTEGER,
                lista_id: Sequelize.INTEGER,
            },{
                sequelize,
            }
        );
        return this;
    }
}
module.exports = listasUsers;