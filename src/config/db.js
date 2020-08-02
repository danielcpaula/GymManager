const { Pool } = require("pg")

module.exports = new Pool({
  user: 'postgres',
  password: "Driver01#",
  host: "localhost",
  port: 5432,
  database: "gymmanager" 
})
