const db = require('../db/db');

const getUsers = async () => {
    try {
        const users = await db.query('SELECT * FROM users');

        return users;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getUsersByName = async (userName) => {
    try {
        const query = 
        `SELECT * FROM users WHERE users.full_name LIKE '%' || $1 || '%'`

        const users = await db.query(query, [userName]);

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

const getUserFriends = async (userId) => {
    try {
        const query =
            `SELECT users.id, users.full_name FROM users
        WHERE users.id IN (
            (SELECT user1_id FROM relations WHERE user2_id = $1 and status = 1)
            UNION
            (SELECT user2_id FROM relations WHERE user1_id = $1 and status = 1)
        )`

        const friends = await db.query(query, [userId]);

        return friends;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getSuggestedUsers = async (userId) => {
    try {
        const query =
            `SELECT * FROM users WHERE id != $1 AND id NOT IN (
                (SELECT user2_id FROM relations WHERE user1_id = $1) 
                UNION
                (SELECT user1_id FROM relations WHERE user2_id = $1)
                )
            LIMIT 10`

        const suggested = await db.query(query, [userId]);

        return suggested;
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateUser = async (userId, userData) => {
    try {
        // Check if new user email is available
        let query = 'SELECT * FROM users WHERE id != $1 AND email = $2';
        const fetchedUser = await db.query(query, [userId, userData.email]);
        
        if (fetchedUser.length) {
            // email is already in use, return
            return "Email not available";
        }

        query =
            `UPDATE users 
        SET full_name = $2, dob = $3, email = $4, password_hash = $5, bio = $6
        WHERE id = $1`

        // retrieve user data from db
        let newUserData = await getUser(userId);

        // temp
        delete newUserData.registered_at;
        delete newUserData.profile_img_url;
        
        // iterate over 'userData's properties and update 'newUserData's corresponding ones
        for (const property in userData) {
            newUserData[property] = userData[property];
        }

        // convert to array
        const params = Object.values(newUserData);

        await db.query(query, params);

        return "User updated";
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
    getUsersByName,
    getUser,
    getUserFriends,
    getSuggestedUsers,
    updateUser,
    deleteUser
}