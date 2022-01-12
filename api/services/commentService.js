const db = require('../db/db');

const getComments = async ()  => {
    try {
        const comments = await db.query('SELECT * from comments');

        return comments;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getComment = async (commentId)  => {
    const query = 'SELECT * FROM comments WHERE id = $1';
    
    try {
        const comment = await db.query(query, [commentId]);

        if (!comment.length) {
            throw new Error("Comment not found");
        }

        return comment[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const createComment = async (commentData)  => {
    let query = 'INSERT INTO comments (user_id, post_id, text'
    
    // get logged in user id and post id
    // temp for testing
    const userId = 1;
    const postId = 1;
    
    const params = [userId, postId, commentData.text];

    if (commentData.hasOwnProperty('parent_id')) {
        query += ', parent_id) VALUES ($1, $2, $3, $4)';
        params.push(commentData.parent_id);
    } else {
        query += ') VALUES ($1, $2, $3)';
    }

    try {
        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateComment = async (commentId, commentData)  => {
    const query =
    `UPDATE comments 
    SET text = $2
    WHERE id = $1`;

    const params = [commentId, commentData.text];

    try {
        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const deleteComment = async (commentId)  => {
    const query = 'DELETE FROM comments WHERE id = $1'

    try {
        return await db.query(query, [commentId]);
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};