const { Pool } = require('pg');

const env = process.env;

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
});

module.exports = {
    async query(text, params) {
        const { rows } = await pool.query(text, params)
        return rows;
    }
}