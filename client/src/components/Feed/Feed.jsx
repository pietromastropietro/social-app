import React from 'react'
import { useState, useEffect } from 'react'
import PostInput from 'components/Post/PostInput'
import Post from '../Post/Post'
import styled from 'styled-components'
import axios from 'axios'
import { radius, color, breakpoint } from 'style'
import { useParams } from 'react-router-dom'
import Image from 'components/Image'

const StyledFeed = styled.div`
`
const NewPostInputContainer = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    display: flex;
    column-gap: 10px;

    > p {
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 0 10px;
        width: 100%;
        background-color: #eef0f5;
        color: grey;
    }
`
const NoPostsMsg = styled.p`
    background-color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const Feed = ({ userId }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const [posts, setPosts] = useState([]);
    const [postInputMode, setPostInputMode] = useState(false);

    const getPosts = async () => {
        let path;

        if (userId) {
            // I'm on the user's profile so show only user's posts
            path = `http://localhost:4000/api/posts/user/${userId}`
        } else {
            // I'm on the homepage so show all user's post and also friend's ones
            path = `http://localhost:4000/api/posts`
        };

        try {
            const res = await axios.get(path, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const createPost = async (post) => {
        setPostInputMode(false);

        try {
            const res = await axios.post('http://localhost:4000/api/posts', {
                userId: user.id,
                postData: post
            });

            if (res.data.message === 'Post created') {
                // copy posts state array, add new post at the beginning and update the state array
                setPosts(oldPosts => [res.data.post, ...oldPosts])
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async (postId) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/posts/${postId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Post deleted") {
                // copy posts state array and remove deleted post
                setPosts(oldPosts => [...oldPosts].filter(post => post.id != postId))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updatePost = async (post) => {
        const updatedPost = {
            text: post.text,
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
                // copy state array, find index of the edited post and update it
                let newPosts = [...posts];
                const index = newPosts.findIndex(editedPost => editedPost.id === post.id);
                newPosts[index] = post;

                // set the updated posts array as state array to trigger component update 
                setPosts(newPosts);
            }
        } catch (err) {
            console.log(err);
        }
    };

    let params = useParams();

    const userIdParam = params?.username?.split('-')[1] || undefined;

    return (
        <StyledFeed>
            {/* 
            Logged in user can create a post only on the homepage or on its personal profile, not on other users' profiles.
            If userIdParam is undefined, user is on the homepage, if it equals logged in user's id, he's on its own profile.
            */}
            {(!userIdParam || userIdParam == user.id) ?
                <NewPostInputContainer>
                    <Image />

                    {postInputMode ?
                        <PostInput handlePost={createPost} />
                        :
                        <p onClick={() => setPostInputMode(true)}>What's on your mind?</p>
                    }
                </NewPostInputContainer>
                : undefined
            }

            {posts.length ?
                posts.map(post =>
                    <Post
                        key={post.id}
                        postContent={post}
                        deletePost={deletePost}
                        updatePost={updatePost}
                    />)
                :
                <NoPostsMsg>No posts to show</NoPostsMsg>
            }
        </StyledFeed>
    )
}

export default Feed
