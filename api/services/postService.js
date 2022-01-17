const db = require('../db/db');

const getPosts = async ()  => {
    try {
        const posts = await db.query('SELECT * FROM posts ORDER BY id DESC');

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

const createPost = async ({ userId, postData })  => {
    let query = 
    'INSERT INTO posts (id, user_id, text, image_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)';

    let post = {
        id: 5, // temp
        userId: userId,
        text: postData.text,
        imgUrl: postData.imgUrl,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const params = Object.values(post);

    try {
        // return await db.query(query, params);
        return await db.query(query, params);
    } catch (err) {
        console.log(err.message);
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