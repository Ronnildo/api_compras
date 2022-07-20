require("dotenv").config();

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } =
  process.env;
//console.log(DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME)
module.exports = {
  // username: "postgres",
  // password: "123456",
  // database: "postgres",
  // host: "localhost",
  dialect: "postgres",
  url: process.env.DATABASE_URL,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    undescoredAll: true,
  },
};
