module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "123456",
    database: "postgres",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },

  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
