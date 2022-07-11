const {Model} = require('sequelize');
const Sequelize = require('sequelize');

class Cell extends Model{
    static init(sequelize){
        super.init({
            cell_id: Sequelize.STRING,
        },{
            sequelize,
        });
        return this;
    }
    static associate(models){
        this.hasMany(models.Listas, {foreignKey: 'cell_id', as: 'listas'});
    }
}

module.exports = Cell;