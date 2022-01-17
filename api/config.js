const env = process.env;

const config = {
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
    }
};

module.exports = config;