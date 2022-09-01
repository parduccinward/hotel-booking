const {Pool} = require("pg");
require("dotenv").config();

const devConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    ssl: {
      rejectUnauthorized: false
    }
  }

const pool = new Pool(devConfig)


module.exports = {
    query: (text,params,callback) => {
        return pool.query(text,params,callback);
    },
}