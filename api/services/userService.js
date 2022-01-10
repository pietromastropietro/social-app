const db = require('../db/db');

const getUsers = async ()  => {
    try {
        const users = await db.query('SELECT * from users');

        return users;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getUser = async (userId)  => {
    const query = 'query $1';
    
    try {
        const user = await db.query(query, [userId]); // test if without array works for single param

        return user;
    } catch (err) {
        throw new Error(err.message)
    }
};

const createUser = async (body)  => {
    // const { firstName, lastName, dob, email, passwordHash, bio, username } = body;

    const query = 'INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    const params = [...body]; // can i do it? test
    // const params = [firstName, lastName, dob, email, passwordHash, bio, username];
    try {
        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateUser = async (userId, body)  => {
    try {
        
    } catch (err) {
        throw new Error(err.message)
    }
};

const deleteUser = async (userId)  => {
    const query = 'DELETE FROM users WHERE id = $1'

    try {
        return await db.query(query, [userId]);
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}