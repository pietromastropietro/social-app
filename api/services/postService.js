const db = require('../db/db');

const getPosts = async ()  => {
    const query = 
    `SELECT posts.*, users.first_name, users.last_name
    FROM posts 
    JOIN users ON posts.user_id = users.id
    ORDER BY id DESC`;

    try {
        const posts = await db.query(query);

        return posts;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getUserPosts = async (userId)  => {
    const query = 
    `SELECT posts.*, users.first_name, users.last_name
    FROM posts 
    JOIN users ON posts.user_id = users.id
    WHERE user_id = $1
    ORDER BY id DESC`;

    try {
        const posts = await db.query(query, [userId]);

        return posts;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getPost = async (postId)  => {
    const query = 
    `SELECT posts.*, users.first_name, users.last_name
    FROM posts 
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = $1`;
    
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

    // temp
    const date = new Date();
    const tempId = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    let post = {
        id: tempId, // temp
        user_id: userId,
        text: postData.text,
        imgUrl: postData.imgUrl,
        created_at: new Date(),
        updated_at: new Date()
    };

    const params = Object.values(post);

    try {
        await db.query(query, params);

        // fetch and return newly created post
        return await getPost(post.id);
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message)
    }
};

const updatePost = async (postId, postData)  => {
    const query = 
    `UPDATE posts 
    SET text = $1, likes = $2, image_url = $3, updated_at = $4
    WHERE id = $5`;

    try {
        const params = Object.values(postData)
        params.push(postId);

        return await db.query(query, params);
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message)
    }
};

const deletePost = async (postId)  => {
    // todo: before deleting a post i need to remove all likes/comment from db

    const query = 'DELETE FROM posts WHERE id = $1'

    try {
        return await db.query(query, [postId]);
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message)
    }
};

module.exports = {
    getPosts,
    getUserPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}