import styled from 'styled-components'
import UserProfileImage from 'components/UserProfileImage'
import Comments from './Comments/Comments'
import { radius, boxShadow } from 'style'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { handleLike } from 'utils/likeUtil'
import { getFormattedDate } from 'utils/dateUtil'

import commentIcon from 'static/images/comment.svg'
import likeIcon from 'static/images/like.svg'
import likedIcon from 'static/images/liked.svg'
import optionIcon from 'static/images/option.svg'
import PostInput from './PostInput'
import LikesList from 'components/LikesList/LikesList'
import DeleteDialog from 'components/DeleteDialog/DeleteDialog'

const StyledPost = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 12px;
    margin: 15px 0;
    box-shadow: ${boxShadow.primary};
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
const PostMain = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    word-break: break-all;
`
const PostImage = styled.img`
    align-self: center;
    max-width: 100%;
    height: auto;
    border-radius: ${radius.primary};
`
const PostFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const LikeAndCommentIcons = styled.div`
    display: flex;
    column-gap: 10px;
    padding: 5px 0;
    
    > div {
        cursor: pointer;
        padding: 5px 15px;
        border-radius: ${radius.primary};
        display: flex;
        align-items: center;
        transition: .2s;

        &:hover {
            background-color: #e0e0e0;
        }

        > img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
    }
`
const LikesCounter = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 5px;
    height: 100%;
    border-radius:10px;
    background-color: #ffffff;
    box-shadow: ${boxShadow.likeCounter};
    padding: 2px 4px 2px 2px;
    margin-right: 15px;
    
    > img {
        width: 20px;
        height: 20px;
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
    box-shadow: ${boxShadow.optionMenu};
    padding: 8px;
    border-radius: ${radius.primary};
    
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
    const [hasUserLikedPost, setHasUserLikedPost] = useState();
    const [optionMenuVisibility, setOptionMenuVisibility] = useState(false);
    const [deleteDialog, showDeleteDialog] = useState(false);

    const creationDate = getFormattedDate(post.created_at);

    const getPostLikes = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/likes/post/${post.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setPostLikes(res.data);
            setHasUserLikedPost(res.data.some(elem => elem.user_id == user.id));
        } catch (err) {
            console.log(err);
        }
    };

    // fetch post likes on component mount
    useEffect(() => {
        getPostLikes();
    }, []);

    // handle user click on 'like' button
    const onPostLike = async () => {
        /*
            handleLikes() checks if user already liked the post,
            creates/deletes the 'like', and returns updated 'likes' array
        */
        setPostLikes(await handleLike(user, post.id, postLikes, 'post'));
        setHasUserLikedPost(!hasUserLikedPost);
    };

    const hideDeleteDialog = () => {
        setOptionMenuVisibility(false);
        showDeleteDialog(false);
    }

    const handlePostEdit = () => {
        setOptionMenuVisibility(false)
        setPostEditMode(true)
    };

    const handlePostDelete = () => {
        setOptionMenuVisibility(false)
        showDeleteDialog(false)
        deletePost(post.id)
    }

    const submitPostEdit = (editedPost) => {
        setPostEditMode(false);
        setPost(editedPost);
        updatePost(editedPost);
    };

    return (
        <StyledPost>
            <PostHeader>
                <div>
                    <UserProfileImage src={post.profile_img_url} />

                    <PostAuthorAndDate>
                        <p><strong>{post.full_name}</strong></p>
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
                        <li onClick={() => showDeleteDialog(true)}>Delete post</li>
                    </OptionMenu>
                    : undefined
                }
            </PostHeader>

            {deleteDialog ?
                <DeleteDialog
                    name="post"
                    handleConfirm={handlePostDelete}
                    handleCancel={hideDeleteDialog}
                />
                : undefined
            }

            <PostMain>
                {postEditMode ?
                    <PostInput originalPost={post} handlePost={submitPostEdit} />
                    :
                    <>
                        <p>{post.text}</p>
                        <PostImage src={post.image_url} alt='' />

                        {/* temp for testing */}
                        {/* <PostImage src={tempImg} alt='post image' /> */}
                    </>
                }
            </PostMain>

            <PostFooter>
                <LikeAndCommentIcons>
                    <div onClick={onPostLike}>
                        <img src={hasUserLikedPost ? likedIcon : likeIcon} />
                        <p>Like</p>
                    </div>

                    <div onClick={() => setCommentInputMode(!commentInputMode)}>
                        <img src={commentIcon} />
                        <p>Comment</p>
                    </div>
                </LikeAndCommentIcons>

                {postLikes.length ?
                    <LikesCounter onClick={() => setLikesVisibility(true)}>
                        <img src={likedIcon} />
                        <p>{postLikes.length}</p>
                    </LikesCounter>
                    : undefined
                }
            </PostFooter>

            {likesVisibility ?
                <LikesList
                    likes={postLikes}
                    name='post'
                    setLikesVisibility={setLikesVisibility}
                />
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
