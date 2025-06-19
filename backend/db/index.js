require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool(); // uses .env automatically
module.exports = pool;
