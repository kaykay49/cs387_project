const Pool = require("pg").Pool;
const config = require("./utils/config");

const pool = new Pool({
      user:config.USER,
      host: config.HOST,
      database: config.DB,
      password: config.PWD,
      port: config.PG_PORT,
});

module.exports = pool;
