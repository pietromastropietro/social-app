import React from 'react'
import { useState, useEffect } from 'react'
import PostInput from './PostInput'
import Post from './Post'
import styled from 'styled-components'
import axios from 'axios'

const StyledFeed = styled.div`
    width: 58%;
    margin: 0 20px;
`

const Feed = ({ userId }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        let path;

        if (userId) {
            path = `http://localhost:4000/api/posts/user/${userId}`
        } else {
            path = `http://localhost:4000/api/posts`
        };

        try {
            const postsReq = await axios.get(path, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setPosts(postsReq.data);
        } catch (err) {
            console.log(err);
        }
    };

    const createPost = async (post) => {
        try {
            const res = await axios.post('http://localhost:4000/api/posts', {
                userId: user.id,
                postData: post
            });

            if (res.data.message === 'Post created') {
                // copy state array and unshift (add to the beginning) the new post
                let newPosts = [...posts];
                newPosts.unshift(res.data.post);

                // set the updated posts array as state array to trigger component update 
                setPosts(newPosts);

                console.log(res.data.message); // temp
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const res = await axios.delete(`http://localhost:4000/api/posts/${postId}`, {
                    headers: {
                        Authorization: (localStorage.getItem('token'))
                    }
                });

                if (res.data.message === "Post deleted") {
                    // copy state array and filter (remove) deleted post
                    let newPosts = [...posts].filter(post => post.id != postId);

                    // set the updated posts array as state array to trigger component update 
                    setPosts(newPosts);

                    console.log(res.data.message); // temp
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const updatePost = async (post) => {
        const updatedPost = {
            text: post.text,
            likes: post.likes,
            image_url: post.image_url,
            updated_at: new Date()
        };

        try {
            const res = await axios.put(`http://localhost:4000/api/posts/${post.id}`, updatedPost, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Post updated") {
                // copy state array and find index of the edited post
                let newPosts = [...posts];
                let index = newPosts.findIndex(item => item.id === post.id);

                // update post
                newPosts[index] = post;
                
                // set the updated posts array as state array to trigger component update 
                setPosts(newPosts);

                console.log(res.data.message); // temp
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <StyledFeed>
            <PostInput createPost={createPost} />
            {/* {posts.map(post => <Post post={post} key={post._id} />)} */}
            {/* {posts.map(post => <Post post={post} images={images} key={post.id} />)} */}
            {posts.map(post =>
                <Post
                    post={post}
                    key={post.id}
                    deletePost={deletePost}
                    updatePost={updatePost}
                />)
            }
        </StyledFeed>
    )
}

export default Feed
