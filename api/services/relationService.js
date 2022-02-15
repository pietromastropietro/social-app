const db = require('../db/db');

const getRelation = async (usersIds) => {
    const users = {
        one: usersIds.split('&')[0],
        two: usersIds.split('&')[1]
    };

    const query =
        `SELECT * FROM relations 
    WHERE (user1_id = $1 AND user2_id = $2) 
    OR (user1_id = $2 AND user2_id = $1)`;


    try {
        const relation = await db.query(query, [users.one, users.two]);

        return relation[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const getFriendsRequests = async (userId) => {
    try {
        const query =
            `SELECT relations.*, users.full_name
        FROM relations
        JOIN users ON users.id = relations.user1_id
        WHERE user2_id = $1 AND status = 0`;

        const requests = await db.query(query, [userId]);

        return requests;
    } catch (err) {
        throw new Error(err.message)
    }
};

const createRelation = async (usersIds) => {    
    const query =
        'INSERT INTO relations (user1_id, user2_id, status) VALUES ($1, $2, $3)';

    const relation = {
        ...usersIds,
        status: 0
    };

    const params = Object.values(relation);

    try {
        await db.query(query, params);

        return relation;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message)
    }
};

const updateRelation = async (relationId) => {
    const query =
        `UPDATE relations 
    SET status = 1
    WHERE id = $1`;

    const params = [relationId];

    try {
        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const deleteRelation = async (relationId) => {
    const query = 'DELETE FROM relations WHERE id = $1'

    try {
        return await db.query(query, [relationId]);
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = {
    getRelation,
    getFriendsRequests,
    createRelation,
    updateRelation,
    deleteRelation
};