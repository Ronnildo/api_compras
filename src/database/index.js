const Sequelize = require('sequelize');
const Lista = require('../app/models/Lista');
const User = require('../app/models/User');
const Item = require('../app/models/Item');
const databaseConfig = require('../config/database');

const models = [User, Lista, Item];

class Database{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();