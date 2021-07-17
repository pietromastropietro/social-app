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

const Feed = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/');
            setPosts(response.data.posts);
            console.log(response.data.posts);
        } catch (error) {
            console.error(error);
            //setError(error)
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <StyledFeed>
            <PostInput />
            {/* <Post /> */}
            {posts.map(post => <Post info={post} key={post._id} />)}
        </StyledFeed>
    )
}

export default Feed
