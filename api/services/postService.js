const db = require('../utils/db');

const getPosts = async (userId) => {
    try {
        // Get all user's posts and all user friends ones
        const query = `
        SELECT posts.*, users.full_name, users.profile_img_url FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.user_id IN (
            VALUES(CAST($1 AS BIGINT))
            UNION
            SELECT user1_id FROM relations WHERE user2_id = $1 and status = 1
            UNION
            SELECT user2_id FROM relations WHERE user1_id = $1 and status = 1
        )
        ORDER BY created_at DESC`

        const posts = await db.query(query, [userId]);

        return posts;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getUserPosts = async (userId) => {
    const query =
        `SELECT posts.*, users.full_name, users.profile_img_url
    FROM posts 
    JOIN users ON posts.user_id = users.id
    WHERE user_id = $1
    ORDER BY created_at DESC`;

    try {
        const posts = await db.query(query, [userId]);

        return posts;
    } catch (err) {
        throw new Error(err.message)
    }
};

const getPost = async (postId) => {
    const query =
        `SELECT posts.*, users.full_name, users.profile_img_url
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

const createPost = async ({ userId, postData }) => {
    let query =
        'INSERT INTO posts (user_id, text, image_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)';

    const post = {
        user_id: userId,
        text: postData.text,
        image_url: postData.image_url,
        created_at: new Date(),
        updated_at: new Date()
    };

    const params = Object.values(post);

    try {
        // add post to db
        await db.query(query, params);

        // fetch newly created post and return it

        query = `SELECT posts.*, users.full_name, users.profile_img_url
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.user_id = $1
        AND posts.text = $2 
        AND posts.created_at = $3`

        const newPost = await db.query(query, [post.user_id, post.text, post.created_at]);

        return newPost[0];
    } catch (err) {
        throw new Error(err.message)
    }
};

const updatePost = async (postId, postData) => {
    const query =
        `UPDATE posts 
    SET text = $1, image_url = $2, updated_at = $3
    WHERE id = $4`;

    try {
        const params = Object.values(postData)
        params.push(postId);

        return await db.query(query, params);
    } catch (err) {
        throw new Error(err.message)
    }
};

const deletePost = async (postId) => {
    const query = 'DELETE FROM posts WHERE id = $1'

    try {
        return await db.query(query, [postId]);
    } catch (err) {
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