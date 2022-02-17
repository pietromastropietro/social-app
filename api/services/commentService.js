const db = require('../utils/db');

const getComments = async () => {
    try {
        const comments = await db.query('SELECT * from comments');

        return comments;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getPostComments = async (postId) => {
    try {
        const query =
            `SELECT comments.*, users.full_name
        FROM comments 
        JOIN users ON comments.user_id = users.id 
        WHERE post_id = $1
        ORDER BY created_at DESC`

        const comments = await db.query(query, [postId]);

        return comments;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getComment = async (commentId) => {
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

const createComment = async (commentData) => {
    let query =
        'INSERT INTO comments (user_id, post_id, text, parent_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)';

    const comment = {
        user_id: commentData.user_id,
        post_id: commentData.post_id,
        text: commentData.text,
        parent_id: commentData.parent_id,
        created_at: new Date(),
        updated_at: new Date()
    };

    const params = Object.values(comment);

    try {
        // add comment to db
        await db.query(query, params);

        // fetch newly created comment and return it

        query = `SELECT * FROM comments
        WHERE comments.user_id = $1
        AND comments.text = $2
        AND comments.created_at = $3`

        const newComment = await db.query(query, [comment.user_id, comment.text, comment.created_at]);

        return newComment[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const updateComment = async (commentId, commentData) => {
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

const deleteComment = async (commentId) => {
    const query = 'DELETE FROM comments WHERE id = $1'

    try {
        return await db.query(query, [commentId]);
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = {
    getComments,
    getPostComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};