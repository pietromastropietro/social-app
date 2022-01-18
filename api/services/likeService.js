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
        const query =
        `INSERT INTO likes (user_id, post_id, comment_id, created_at, id)
        VALUES ($1, $2, $3, $4, $5)`;

        const date = new Date(); // temp

        const like = {
            ...likeData,
            createdAt: new Date(),
            id: `${date.getHours()}${date.getMinutes()}${date.getSeconds()}` // temp
        }

        const params = Object.values(like);

        // return await db.query(query, params);

        await db.query(query, params);

        if (like.postId) {
            updateContentLikes('posts', '+', like.postId);
        } else {
            updateContentLikes('comments', '+', like.commentId);
        }

        return;
    } catch (err) {
        console.log(err.message);
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