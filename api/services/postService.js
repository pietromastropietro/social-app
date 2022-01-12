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

        if (!post.length) {
            throw new Error("Post not found");
        }

        return post[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const createPost = async (postData)  => {
    let query = 'INSERT INTO posts (user_id, text'
    
    // get logged in user id
    // const userId = getLoggedUserId();
    // temp for testing
    const userId = 1;
    
    const params = [userId, postData.text];

    if (postData.hasOwnProperty('image_url')) {
        query += ', image_url) VALUES ($1, $2, $3)';
        params.push(postData.image_url);
    } else {
        query += ') VALUES ($1, $2)';
    }

    try {
        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const updatePost = async (postId, postData)  => {
    const query = 
    `UPDATE posts SET text = $2, image_url = $3 WHERE id = $1`;

    try {
        // retrieve post data from db
        let newPostData = await getPost(postId);

        // iterate over 'postData's properties and update 'newPostData's corresponding ones
        for (const property in postData) {
            newPostData[property] = postData[property];
        }

        const params = [postId, newPostData.text, newPostData.image_url];

        return await db.query(query, params);
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