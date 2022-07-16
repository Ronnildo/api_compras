require("dotenv").config();

const { DATABASE_USERNAME, DATABASE_NAME, DATABASE_HOST, DATABASE_PASSWORD } =
  process.env;
module.exports = {
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password:DATABASE_PASSWORD,
  database: DATABASE_NAME,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnathorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
