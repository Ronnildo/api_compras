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

  // static associate(models) {
  //   this.hasMany(models.Listas, {foreignKey: 'user_id', as: 'user'});
  // }
}

module.exports = User;
