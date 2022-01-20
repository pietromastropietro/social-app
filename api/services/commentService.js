const db = require('../db/db');

const getComments = async ()  => {
    try {
        const comments = await db.query('SELECT * from comments');

        return comments;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getPostComments = async (postId)  => {
    try {
        const query = 
        `SELECT comments.*, users.first_name, users.last_name 
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
    const query = 
    'INSERT INTO comments (user_id, post_id, text, parent_id, created_at, updated_at, id) VALUES ($1, $2, $3, $4, $5, $6, $7)';

    const date = new Date(); // temp

    const comment = {
        ...commentData,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: `${date.getHours()}${date.getMinutes()}${date.getSeconds()}` // temp
    };
    
    const params = Object.values(comment);

    console.log(JSON.stringify(params,null,2));

    try {
        await db.query(query, params);

        return comment;
    } catch (err) {
        console.log(err.message);
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
    getPostComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
};