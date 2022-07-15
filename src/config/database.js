require('dotenv').config();

const con = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}`

module.exports = {
    dialect:"postgres",
    // host: "localhost",
    // username: "postgres",
    // password:"123456",
    // database: "postgres",
    // define: {
    //   timestamps: true,
    //   underscored: true,
    //   underscoredAll: true,
    // },
    connectionString: con ? process.env.DATABASE_URL: connectionString,
    ssl: {
      rejectUnathorized: false,
    }
};
