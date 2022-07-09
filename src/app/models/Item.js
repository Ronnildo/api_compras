const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Itens extends Model{
    static init(sequelize){
        super.init({
            nameItem: Sequelize.STRING,
            category: Sequelize.STRING,
        },{
            sequelize,
        });
        return this;
    }

    static associate(models){
        models.Listas.hasMany(models.Itens);
        this.belongsTo(models.Listas, {foreignKey: 'lista_id', as: 'lista'});
    }
}

module.exports = Itens;