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
        models.User.hasMany(models.Listas);
        this.belongsTo(models.Listas, {foreignKey: 'user_id', as: 'user'});
        
        models.Itens.hasMany(models.Listas);
        this.belongsTo(models.Itens, {foreignKey: 'iten_id', as: 'item'});
    }
}
module.exports = Listas;