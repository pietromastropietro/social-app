import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { createLike, handleLike, removeLike } from '../likeUtil'
import Button from './Button'
import Image from './Image'
import Input from './Input'

const StyledComment = styled.div`
    display: flex;
    margin-top: 10px;
`
const Container = styled.div`
    background-color: #eef0f5;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
`
const CommentWriter = styled.div`
    display: flex;
    justify-content: space-between;
`
const CommentText = styled.div`
`
const ReplyContainer = styled.div`
    margin-left: 40px;
`
const LikesContainer = styled.div`

`

const Comment = ({ comment, createComment, deleteComment, updateComment }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [commentUpdates, setCommentUpdates] = useState(comment);
    const [commentEditMode, setCommentEditMode] = useState(false);
    const [commentLikes, setCommentLikes] = useState([]);
    const [likesVisibility, setLikesVisibility] = useState(false);

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
        } catch (err) {
            console.log(err);
        }
    };

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
    };

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

                <Container>
                    <CommentWriter>
                        <p><strong>{comment.first_name} {comment.last_name}</strong></p>
                        <p>{lastUpdate}</p>

                        {user.id == comment.user_id ?
                            <>
                                <div onClick={() => setCommentEditMode(true)}>Edit</div>
                                <div onClick={() => deleteComment(comment)}>Delete</div>
                            </>
                            : undefined
                        }
                        <p onClick={() => setLikesVisibility(!likesVisibility)}>-{commentLikes.length}</p>
                    </CommentWriter>

                    {commentEditMode ?
                        <form>
                            <Input type="text" name="commentText" value={commentUpdates.text} onChange={handleInput} />
                            <Button type='button' onClick={() => submitCommentEdit(commentUpdates)}>Confirm</Button>
                        </form>
                        :
                        <CommentText>
                            <p>{comment.text}</p>
                        </CommentText>
                    }
                    <div>
                        <p onClick={onCommentLike}>Like</p>
                        {!comment.parent_id ?
                            <p onClick={() => setReplyInputMode(true)}>Reply</p>
                            : undefined
                        }
                    </div>
                </Container>
            </StyledComment>

            {likesVisibility ?
                <LikesContainer>
                    <p>Likes</p>
                    <ul>
                        {commentLikes.map(like =>
                            <li key={like.id}>
                                {like.first_name} {like.last_name}
                            </li>
                        )}
                    </ul>
                </LikesContainer>
                : undefined
            }

            <ReplyContainer>
                {replyInputMode ?
                    <form>
                        <Input type="text" name="replyText" placeholder='Write your reply here...' value={reply.text} onChange={handleInput} />
                        <Button type='button' onClick={createReply}>Confirm</Button>
                    </form>
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
