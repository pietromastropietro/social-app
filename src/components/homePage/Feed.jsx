import React from 'react'
import PostInput from './PostInput'
import Post from './Post'
import styled from 'styled-components'

const StyledFeed = styled.div`
    margin: 10px 20px;
`

const Feed = () => {
    // all posts in a single database, 
    // or a single person dabatase with all his info (posts, name etc)?

    return (
        <StyledFeed>
            <PostInput />
            <Post />
        </StyledFeed>
    )
}

export default Feed
