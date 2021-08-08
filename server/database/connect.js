const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "6101665",
  host: "localhost",
  port: 5432,
  database: "posts",
});

module.exports = pool;
