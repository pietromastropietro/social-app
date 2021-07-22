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

const Feed = ({ posts }) => {
    return (
        <StyledFeed>
            <PostInput />
            {posts.map(post => <Post post={post} key={post._id} />)}
        </StyledFeed>
    )
}

export default Feed
