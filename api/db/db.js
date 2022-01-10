const config = require('../config');
const { Pool } = require('pg');
const pool = new Pool(config.db);

module.exports = {
    async query(text, params) {
        const { rows } = await pool.query(text, params)
        return rows;
    }
}