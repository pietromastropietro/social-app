const db = require('../utils/db');

const getPostLikes = async (postId) => {
    try {
        const query = 
        `SELECT likes.*, users.full_name, users.profile_img_url
        FROM likes
        JOIN users on likes.user_id = users.id
        WHERE post_id = $1
        ORDER BY created_at DESC`;

        const likes = await db.query(query, [postId]);

        return likes;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getCommentLikes = async (commentId) => {
    try {
        const query = 
        `SELECT likes.*, users.full_name, users.profile_img_url
        FROM likes
        JOIN users on likes.user_id = users.id
        WHERE comment_id = $1
        ORDER BY created_at DESC`;

        const likes = await db.query(query, [commentId]);

        return likes;
    } catch (err) {
        throw new Error(err.message)
    }
};

const createLike = async (likeData) => {
    let query =
    `INSERT INTO likes (user_id, post_id, comment_id, created_at)
    VALUES ($1, $2, $3, $4)`;
    
    const like = {
        ...likeData,
        created_at: new Date()
    }
    
    const params = Object.values(like);
    
    try {
        // add new like to db
        await db.query(query, params);

        // fetch newly created like and return it

        query = `SELECT * FROM likes WHERE user_id = $1 AND created_at = $2`

        const newLike = await db.query(query, [like.user_id, like.created_at])

        return newLike[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const deleteLike = async (likeId) => {
    try {
        const like = await getLike(likeId);

        const query = 'DELETE FROM likes WHERE id = $1'

        return await db.query(query, [likeId]);
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
    getPostLikes,
    getCommentLikes,
    createLike,
    deleteLike
};