const { Pool } = require('pg');
const env = process.env;
const isProduction = env.NODE_ENV === "production";
const connectionString = `postgresql://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? env.DATABASE_URL : connectionString,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});

module.exports = {
    async query(text, params) {
        const { rows } = await pool.query(text, params)
        return rows;
    }
}