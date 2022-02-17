const db = require('../utils/db');
const bcrypt = require('bcrypt');

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
            `SELECT * FROM users WHERE users.full_name ILIKE '%' || $1 || '%'`

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

const updateUser = async (userId, user) => {
    try {
        // Fetch user from db
        let fetchedUser = await getUser(userId);

        // If user chose to change his old password, check if it matches with the one in db
        if (user.oldPassword) {
            const passwordMatch = await bcrypt.compare(user.oldPassword, fetchedUser.password_hash);

            if (!passwordMatch) {
                return "Passwords don't match";
            } else {
                // encrypt new password
                fetchedUser.password_hash = await bcrypt.hash(user.newPassword, 10);
            }
        }

        // Delete now useless fields
        delete user.oldPassword;
        delete user.newPassword;

        // If user chose to change his old email, check if new one is available
        let query = 'SELECT email FROM users WHERE id != $1 AND email = $2';

        const fetchedEmail = (await db.query(query, [userId, user.email]))[0];

        if (fetchedEmail) {
            // Email is already in use, return
            return "Email not available";
        }

        query =
        `UPDATE users 
        SET full_name = $2, dob = $3, email = $4, password_hash = $5, bio = $6, profile_img_url = $7, registered_at = $8
        WHERE id = $1`
        
        // Iterate over 'user's properties and update 'fetchedUser's corresponding ones
        for (const property in user) {
            fetchedUser[property] = user[property];
        }
        
        const params = Object.values(fetchedUser);

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