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
import { useEffect } from 'react'
import { createLike, handleLike, removeLike } from '../../likeUtil'
import { getFormattedDate } from '../../dateUtil'

import likeIcon from '../../assets/images/like.svg'
import likedIcon from '../../assets/images/liked.svg'
import optionIcon from '../../assets/images/option.svg'

const StyledPost = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 12px;
    margin: 15px 0;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`
const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    position: relative;

    > div {
        display: flex;
    }
`
const PostDate = styled.p`
    color: #929292;
    font-size: 14px;
`

const PostAuthorAndDate = styled.div`
    text-transform: capitalize;
    margin-left: 10px;
`
const PostText = styled.div`
    margin-bottom: 10px;
`
const PostMain = styled.div`
    
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


const OptionMenuBtn = styled.div`
    width: 16px;
    height: 16px;
    padding: 6px;
    border-radius: 50%;
    transition: .2s;
    cursor: pointer;
    
    &:hover {
        background-color: #d1d1d1;
    }

    > img {
        width: 16px;
        height: 16px;
        opacity: 0.7;
    }
`
const OptionMenu = styled.ul`
    list-style: none;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    margin-top: 30px;
    box-shadow: 0 1px 6px 0 #0000006c;
    padding: 8px;
    border-radius: 10px;
    
    > li {
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
        transition: .2s;
        
        &:hover {
            background-color: #dbdbdb;
        }
    }
    
`



const Post = ({ postContent, deletePost, updatePost }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [post, setPost] = useState(postContent);
    const [postLikes, setPostLikes] = useState([]);

    const [postEditMode, setPostEditMode] = useState(false);
    const [commentInputMode, setCommentInputMode] = useState(false);
    const [likesVisibility, setLikesVisibility] = useState(false);
    const [optionMenuVisibility, setOptionMenuVisibility] = useState(false);

    const creationDate = getFormattedDate(post.created_at);

    // console.log(JSON.stringify(postContent, null ,2));

    const getPostLikes = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/likes/post/${post.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setPostLikes(res.data);

            // console.log(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    // fetch post likes on component mount
    useEffect(() => {
        getPostLikes();
    }, []);

    // handle input on post edit
    const handleInput = (e) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value
        });
    }

    // handle user click on 'like' button
    const onPostLike = async () => {
        /*
            handleLikes() checks if user already liked the post,
            creates/deletes the 'like', and returns updated 'likes' array
        */
        setPostLikes(await handleLike(user, post.id, postLikes, 'post'));
    };

    const handlePostEdit = () => {
        setOptionMenuVisibility(false)
        setPostEditMode(true)
    };

    const handlePostDelete = () => {
        setOptionMenuVisibility(false)
        deletePost(post.id)
    }

    const submitPostEdit = (post) => {
        setPostEditMode(false);
        updatePost(post);
    };

    return (
        <StyledPost>
            <PostHeader>
                <div>
                    <Image />

                    <PostAuthorAndDate>
                        <p><strong>{`${post.first_name} ${post.last_name}`}</strong></p>
                        <PostDate>{creationDate}</PostDate>
                    </PostAuthorAndDate>
                </div>

                {user.id == post.user_id ?
                    <OptionMenuBtn
                        onClick={() => setOptionMenuVisibility(!optionMenuVisibility)}
                    >
                        <img src={optionIcon} />
                    </OptionMenuBtn>
                    : undefined
                }

                {optionMenuVisibility ?
                    <OptionMenu>
                        <li onClick={handlePostEdit}>Edit post</li>
                        <li onClick={handlePostDelete}>Delete post</li>
                    </OptionMenu>
                    : undefined
                }
            </PostHeader>

            <PostMain>
                {postEditMode ?
                    <form>
                        <Input type="text" value={post.text} name="text" onChange={handleInput} />
                        <Button type='button' onClick={() => submitPostEdit(post)}>Confirm</Button>
                    </form>
                    :
                    <>
                        <PostText>{post.text}</PostText>
                        <PostImage src={tempImage} />
                    </>
                }
            </PostMain>

            <PostFooter>
                <div onClick={onPostLike}>Like</div>

                <Likes onClick={() => setLikesVisibility(!likesVisibility)}>
                    <p><strong>{postLikes.length}</strong></p>
                    <p>Likes</p>
                </Likes>

                <div onClick={() => setCommentInputMode(!commentInputMode)}>Comment</div>
            </PostFooter>

            {likesVisibility ?
                <div>
                    <p>Who liked this post?</p>
                    <ul>
                        {postLikes.map(like =>
                            <li key={like.id}>
                                {like.first_name} {like.last_name}
                            </li>
                        )}
                    </ul>
                </div>
                : undefined
            }

            <Comments
                postId={post.id}
                commentInputMode={commentInputMode}
                setCommentInputMode={setCommentInputMode}
            />
        </StyledPost>
    )
}

export default Post
