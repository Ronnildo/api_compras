const { Model } = require('sequelize');
const Sequelize = require("sequelize");

class Listas extends Model{
    static init(sequelize){
        super.init(
            {
                mes: Sequelize.STRING,
            },{
                sequelize,
            }
        );
        return this;
    }

    static associate(models){
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
        
        this.hasMany(models.Itens, {foreignKey: 'lista_id', as: 'lista'});
    }
}
module.exports = Listas;