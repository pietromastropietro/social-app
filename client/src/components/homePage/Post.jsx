import React, { useReducer } from 'react'
import styled from 'styled-components'
import Image from '../Image'
import PostImage from '../PostImage'
import Comments from '../Comments'
import { radius, color } from '../../style'
import tempImage from '../../assets/images/temp2.jpg'
import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import axios from 'axios'

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
const Post = ({ post, images, deletePost, updatePost, likePost }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const author = `${post.first_name} ${post.last_name}`

    const dateObj = new Date(post.created_at); // temp
    const date = `${dateObj.toDateString()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;

    // const randomImg = images[Math.floor(Math.random() * 29)].download_url;

    const [editable, setEditable] = useState(false);

    // console.log(JSON.stringify(post, null ,2));

    const [postData, setPostData] = useState(post);


    const handleInput = (e) => {
        const { name, value } = e.target;

        setPostData({
            ...postData,
            [name]: value
        });
    }

    const handleLike = () => {
        
    };

    // this function has to be in its own file because i will need it for comments too
    const createLike = async (userId, contentId, contentType) => {
        const like = {
            userId: userId,
            postId: null,
            commentId: null
        }

        if (contentType === 'post') {
            like.postId = contentId;
        } else {
            like.commentId = contentId;
        }

        try {
            const res = await axios.post(`http://localhost:4000/api/likes`, like, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            console.log(res.data.message);
        } catch (err) {
            console.log(err);
        }
    }




    const submitEdit = (postData) => {
        setEditable(false);
        updatePost(postData);
    }

    return (
        <StyledPost>
            <PostHeader>
                <Image />
                <PostTitleDate>
                    <p><strong>{author}</strong></p>
                    <p>{date}</p>
                </PostTitleDate>
                {user.id === post.user_id ?
                    <>
                        <div onClick={() => setEditable(true)}>Edit</div>
                        <div onClick={() => deletePost(post.id)}>Delete</div>
                    </>
                    : undefined
                }
            </PostHeader>
            {/* <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</PostText> */}
            {/* <PostText>{post.body}</PostText> */}
            {editable ?
                <>
                    <Input type="text" value={postData.text} name="text" onChange={handleInput} />
                    <Button onClick={() => submitEdit(postData)}>Confirm</Button>
                </>
                :
                <PostText>{post.text}</PostText>
            }

            {/* <PostImage src={randomImg} alt=""/> */}
            <PostImage src="" alt="" />
            <PostFooter>
                {/* <div onClick={() => likePost(post.id)}>Heart</div> */}
                <div onClick={handleLike}>Heart</div>
                <Likes>
                    <p><strong>{post.likes}</strong></p>
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
