const db = require('../db/db');

const getUsers = async () => {
    try {
        const users = await db.query('SELECT * from users');

        return users;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getUser = async (userId) => {
    try {
        const query = 'SELECT * FROM users WHERE id = $1';
        
        const user = await db.query(query, [userId]);

        if (!user.length) {
            throw new Error("User not found");
        }

        return user[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateUser = async (userId, userData) => {
    const query =
    `UPDATE users 
    SET first_name = $2, last_name = $3, dob = $4, email = $5, password_hash = $6, bio = $7, username = $8
    WHERE id = $1`

    try {
        // retrieve user data from db
        let newUserData = await getUser(userId);

        // iterate over 'userData's properties and update 'newUserData's corresponding ones
        for (const property in userData) {
            newUserData[property] = userData[property];
        }

        // convert to array
        const params = Object.values(newUserData);

        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const deleteUser = async (userId) => {
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
    updateUser,
    deleteUser
}