const db = require('../db/db');

const getPosts = async ()  => {
    try {
        const posts = await db.query('SELECT * from posts');

        return posts;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getPost = async (postId)  => {
    const query = 'SELECT * FROM posts WHERE id = $1';
    
    try {
        const post = await db.query(query, [postId]);

        return post;
    } catch (err) {
        throw new Error(err.message)
    }
};

const createPost = async (body)  => {
    // const {  } = body;

    const query = 'INSERT INTO posts VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    const params = [...body]; // can i do it? test
    // const params = [];
    try {
        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const updatePost = async (postId, body)  => {
    try {
        
    } catch (err) {
        throw new Error(err.message)
    }
};

const deletePost = async (postId)  => {
    const query = 'DELETE FROM posts WHERE id = $1'

    try {
        return await db.query(query, [postId]);
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}