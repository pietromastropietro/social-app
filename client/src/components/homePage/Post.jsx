import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import PostImage from '../PostImage'
import Comments from '../Comments'
import { radius, color } from '../../style'
import tempImage from '../../assets/images/temp2.jpg'

const StyledPost = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 12px;
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

const Likes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > :last-child {
        font-size: 12px;
    }
`
const Post = ({ post, images }) => {
    const randomImg = images[Math.floor(Math.random() * 29)].download_url;
    
    return (
        <StyledPost>
            <PostHeader>
                <Image />
                <PostTitleDate>
                    <p><strong>User n.{post.userId}</strong></p>
                    <p>12 hours ago</p>
                </PostTitleDate>
            </PostHeader>
            {/* <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</PostText> */}
            <PostText>{post.body}</PostText>
            <PostImage src={randomImg} alt=""/>
            <PostFooter>
                <div>Heart</div>
                <Likes>
                    <p><strong>5</strong></p>
                    <p>Likes</p>
                </Likes>
                <div>Comment</div>
            </PostFooter>
            {/* <Comments comments={post.comments} /> */}
        </StyledPost>

        // <StyledPost>
        //     <PostHeader>
        //         <Image />
        //         <PostTitleDate>
        //             <p><strong>{post.author.fullName}</strong></p>
        //             <p>12 hours ago</p>
        //         </PostTitleDate>
        //     </PostHeader>
        //     {/* <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</PostText> */}
        //     <PostText>{post.body}</PostText>
        //     <PostImage src={tempImage} alt=""/>
        //     <PostFooter>
        //         <div>Heart</div>
        //         <Likes>
        //             <p><strong>{post.likes.length}</strong></p>
        //             <p>Likes</p>
        //         </Likes>
        //         <div>Comment</div>
        //     </PostFooter>
        //     <Comments comments={post.comments} />
        // </StyledPost>
    )
}

export default Post
