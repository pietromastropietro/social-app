import React from 'react'
import styled from 'styled-components'
import Image from '../Image'

const StyledPost = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    margin: 15px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const PostHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
`
const PostTitleDate = styled.div`
    margin-left: 10px;
`

const PostText = styled.div`

`

const Post = () => {
    return (
        <StyledPost>
            <PostHeader>
                <Image />
                <PostTitleDate>
                    <p>person name</p>
                    <p>post date</p>
                </PostTitleDate>
            </PostHeader>
            <p>pos text post text post text post text post text post text post text post text</p>
            <img src="" alt="post img" />
        </StyledPost>
    )
}

export default Post
