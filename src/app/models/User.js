const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeCreate", async (user) => {
      if (user.password) {
        user.password_hash == (await bcrypt.hash(user.password, 8));
      }
    });
    return this;
  }

  static associate(models) {
    models.Listas.hasMany(models.User);
    this.belongsTo(models.Listas, {foreignKey: 'lista_id', as: 'lista'});
  }
}

module.exports = User;
