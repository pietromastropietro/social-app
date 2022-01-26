import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { createLike, handleLike, removeLike } from '../likeUtil'
import Button from './Button'
import Image from './Image'
import textareas from './Input'
import commentIcon from '../assets/images/comment.svg'
import likeIcon from '../assets/images/like.svg'
import likedIcon from '../assets/images/liked.svg'
import optionIcon from '../assets/images/option.svg'

const StyledComment = styled.div`
    display: flex;
    margin-top: 10px;
    position: relative;
`
const Container = styled.div`
    background-color: #eef0f5;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
    width: auto;
`
const CommentHeader = styled.div`
    display: flex;
    column-gap: 25px;
    justify-content: space-between;
    text-transform: capitalize;
    position: relative;

`
const CommentDate = styled.p`
    color: #929292;
    font-size: 14px;
`

const CommentInput = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 5px;
    
    > textarea {
        box-sizing: border-box;
        font-family: inherit;
        font-size: inherit;

        border: none;
        outline: none;
        resize: none;
        
        border-radius: 10px;
        width: 100%;
        padding: 5px;
    }
    
`
const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    margin-left: 20px;
    margin-right: 10px;


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
const LikeAndCommentIcons = styled.div`
    > img {
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin-right: 15px;
    }
`

const LikesCounter = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 5px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 #0000006c;
    padding: 2px 4px 2px 2px;
    
    > img {
        width: 20px;
        height: 20px;
    }
`


const CommentText = styled.p`
    margin-top: 3px;
`
const ReplyContainer = styled.div`
    margin-left: 55px;
`

const ReplyInput = styled.div`
    display: flex;
    margin-top: 10px;

    > form {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        align-items: flex-end;
        margin-left: 10px;
        width: 100%;

        > textarea {
            background-color: #eef0f5;
            box-sizing: border-box;            
            border-radius: 10px;
            width: 100%;
            padding: 10px;
        }
    }
`
const LikesContainer = styled.ul`
    background-color: #ffffff;
    box-shadow: 0 1px 6px 0 #0000006c;
    border-radius: 10px;
    padding: 10px;
    position: absolute;
    right: 0;
    margin-top: 150px;
    z-index: 1;

    > li {
        display: flex;
        align-items: center;
        column-gap: 10px;

        > p {
            text-transform: capitalize;
        }
        
        /* temp */
        > div > img {
            width: 25px !important;
            height: 25px !important;
        }
    }

`

const Comment = ({ comment, createComment, deleteComment, updateComment }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [commentUpdates, setCommentUpdates] = useState(comment);
    const [commentEditMode, setCommentEditMode] = useState(false);
    const [commentLikes, setCommentLikes] = useState([]);
    const [hasUserLikedComment, setHasUserLikedComment] = useState();
    const [likesVisibility, setLikesVisibility] = useState(false);
    const [optionMenuVisibility, setOptionMenuVisibility] = useState(false);

    const replies = comment.replies || [];
    const [replyInputMode, setReplyInputMode] = useState(false);
    const [reply, setReply] = useState({
        user_id: user.id,
        post_id: comment.post_id,
        text: "",
        parent_id: comment.id
    });

    // temp
    const lastUpdate = new Date(comment.updated_at).toDateString();

    const getCommentLikes = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/likes/comment/${comment.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setCommentLikes(res.data);
            checkIfUserLikedComment(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const checkIfUserLikedComment = (likes) => {
        // console.log(JSON.stringify(likes, null, 2));
        const likee = likes.filter(elem => elem.id != user.id);

        if (likee.length) {
            setHasUserLikedComment(true);
        } else {
            setHasUserLikedComment(false);
        }

        // console.log(JSON.stringify(likee, null, 2));
    }

    //fetch comment likes
    useEffect(() => {
        getCommentLikes();
    }, []);

    // handle user click on 'like' button
    const onCommentLike = async () => {
        /*
            handleLikes() checks if user already liked the comment,
            creates/deletes the 'like', and returns updated 'likes' array
        */
        setCommentLikes(await handleLike(user, comment.id, commentLikes, 'comment'));
        setHasUserLikedComment(!hasUserLikedComment);
    };

    const handleCommentEdit = () => {
        setOptionMenuVisibility(false)
        setCommentEditMode(true)
    }

    const handleCommentDelete = () => {
        setOptionMenuVisibility(false)
        deleteComment(comment)
    }

    const submitCommentEdit = (commentUpdates) => {
        setCommentEditMode(false);
        updateComment(commentUpdates);
    };

    // todo check if i need async await
    const createReply = async () => {
        setReplyInputMode(false);
        await createComment(reply);

        // reset reply text
        setReply({
            ...reply,
            text: ""
        });
    };

    // handle user input for comments/replies
    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === 'commentText') {
            setCommentUpdates({
                ...commentUpdates,
                text: value
            });
        } else {
            setReply({
                ...reply,
                text: value
            });
        }
    };


    return (
        <>
            <StyledComment>
                <Image />

                <div>
                    <Container>
                        <CommentHeader>
                            <div>
                                <p><strong>{comment.first_name} {comment.last_name}</strong></p>
                                <CommentDate>{lastUpdate}</CommentDate>
                            </div>

                            {user.id == comment.user_id ?
                                <OptionMenuBtn
                                    onClick={() => setOptionMenuVisibility(!optionMenuVisibility)}
                                >
                                    <img src={optionIcon} />
                                </OptionMenuBtn>
                                : undefined
                            }

                            {optionMenuVisibility ?
                                <OptionMenu>
                                    <li onClick={handleCommentEdit}>Edit comment</li>
                                    <li onClick={handleCommentDelete}>Delete comment</li>
                                </OptionMenu>
                                : undefined
                            }
                        </CommentHeader>

                        {commentEditMode ?
                            <CommentInput>
                                <textarea autoFocus rows='3' cols='35' name="commentText" value={commentUpdates.text} onChange={handleInput} />
                                <Button type='button' onClick={() => submitCommentEdit(commentUpdates)}>Confirm</Button>
                            </CommentInput>
                            :
                            <CommentText>{comment.text}</CommentText>
                        }
                    </Container>

                    <CommentFooter>
                        <LikeAndCommentIcons>
                            <img
                                onClick={onCommentLike}
                                src={hasUserLikedComment ? likedIcon : likeIcon} /
                            >
                            {!comment.parent_id ?
                                <img
                                    onClick={() => setReplyInputMode(!replyInputMode)}
                                    src={commentIcon}
                                />
                                : undefined
                            }
                        </LikeAndCommentIcons>

                        <LikesCounter onClick={() => setLikesVisibility(!likesVisibility)}>
                            <img src={likedIcon} />
                            <p>{commentLikes.length}</p>
                        </LikesCounter>

                    </CommentFooter>

                </div>

                {likesVisibility ?
                    <LikesContainer>
                        {commentLikes.map(like =>
                            <li key={like.id}>
                                <Image />
                                <p>
                                    {like.first_name} {like.last_name}
                                </p>
                            </li>
                        )}
                    </LikesContainer>
                    : undefined
                }
            </StyledComment>

            <ReplyContainer>

                {replyInputMode ?
                    <ReplyInput>
                        <Image />

                        <form>
                            <textarea autoFocus rows='2' name="replyText" placeholder='Write your reply here...' value={reply.text} onChange={handleInput} />
                            {/* <textarea type="text" name="replyText" placeholder='Write your reply here...' value={reply.text} onChange={handleInput} /> */}
                            <Button type='button' onClick={createReply}>Confirm</Button>
                        </form>
                    </ReplyInput>
                    : undefined
                }

                {/* 
                // If this is a comment, and this comment has replies, map the 'replies' array.
                // If this is a reply, 'replies' array will be empty so don't map it.
                */}
                {replies.length > 0 &&
                    replies.map(reply => {
                        return <Comment
                            key={reply.id}
                            comment={reply}
                            updateComment={updateComment}
                            deleteComment={deleteComment}
                        />
                    })
                }
            </ReplyContainer>
        </>
    )
};

export default Comment
