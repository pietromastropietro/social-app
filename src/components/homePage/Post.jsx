import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import PostImage from '../PostImage'

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
    margin-bottom: 10px;
`
const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

const Post = () => {
    return (
        <StyledPost>
            <PostHeader>
                <Image />
                <PostTitleDate>
                    <p>John Smith</p>
                    <p>12 hours ago</p>
                </PostTitleDate>
            </PostHeader>
            <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</PostText>
            <PostImage />
            <PostFooter>
                <div>Heart</div>
                <div>34
                    <div>Likes</div>
                </div>
                <div>Comment</div>
            </PostFooter>
        </StyledPost>
    )
}

export default Post
