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

        // console.log(JSON.stringify(relation[0],null,2));

        // if (!relation.length) {
        //     throw new Error("Relation not found");
        // }

        return relation[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const createRelation = async (usersIds) => {
    const query =
        'INSERT INTO relations (user1_id, user2_id, status, id) VALUES ($1, $2, $3, $4)';

    const date = new Date(); // temp

    const relation = {
        ...usersIds,
        status: 0,
        id: `${date.getHours()}${date.getMinutes()}${date.getSeconds()}` // temp
    };

    const params = Object.values(relation);

    try {
        await db.query(query, params);

        return relation;
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateRelation = async (relationId) => {
    console.log("rel id: " + relationId);

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
    createRelation,
    updateRelation,
    deleteRelation
};