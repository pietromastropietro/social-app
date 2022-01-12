const db = require('../db/db');

const getContentLikes = async (contentId) => {
    try {
        const query = 'SELECT * FROM likes WHERE post_id = $1 OR comment_id = $1';
        const likes = await db.query(query, [contentId]);

        return likes;
    } catch (err) {
        throw new Error(err.message)
    }
};

const createLike = async (likeData) => {
    try {
        let query = 'INSERT INTO likes (user_id'
        const params = [likeData.user_id];

        if (likeData.hasOwnProperty('post_id')) {
            query += ', post_id)';
            params.push(likeData.post_id);
            updateContentLikes('posts', '+', likeData.post_id);
        } else {
            query += ', comment_id)';
            updateContentLikes('comments', '+', likeData.comment_id);
            params.push(likeData.comment_id);
        };

        query += 'VALUES ($1, $2)';

        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const deleteLike = async (likeId) => {
    try {
        const like = await getLike(likeId);
        
        if (like.post_id !== null) {
            updateContentLikes('posts', '-', like.post_id);
        } else {
            updateContentLikes('comments', '-', like.comment_id);
        };
        
        const query = 'DELETE FROM likes WHERE id = $1'

        return await db.query(query, [likeId]);
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateContentLikes = async (table, operation, id) => {
    try {
        const query = `UPDATE ${table} SET likes = likes ${operation} 1 WHERE id = $1`
        
        return await db.query(query, [id]);
    } catch (err) {
        throw new Error(err.message)
    }
};

const getLike = async (likeId) => {
    try {
        const query = 'SELECT * FROM likes WHERE id = $1'

        const like = await db.query(query, [likeId]);

        if (!like.length) {
            throw new Error("Like not found");
        }

        return like[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = {
    getContentLikes,
    createLike,
    deleteLike
};