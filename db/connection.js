const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // PostgreSQL username
  host: 'localhost',
  database: 'employee_tracker', // Your PostgreSQL database name
  password: 'meldrina', // PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
