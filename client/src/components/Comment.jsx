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

    const [commentData, setCommentData] = useState(comment); // TODO rename this to commentUpdates, and use ONLY for things related to comment edits
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

    const submitCommentEdit = (commentData) => {
        setCommentEditMode(false);
        updateComment(commentData);
    }

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

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === 'commentText') {
            setCommentData({
                ...commentData,
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
                            <Input type="text" value={commentData.text} name="commentText" onChange={handleInput} />
                            <Button type='button' onClick={() => submitCommentEdit(commentData)}>Confirm</Button>
                        </form>
                        :
                        <CommentText>

                            <p>{comment.text}</p>
                        </CommentText>
                    }

                    <div>
                        <p onClick={onCommentLike}>Like</p>
                        {/* // temp, i will normalize property names */}
                        {!comment.parent_id ? <p onClick={() => setReplyInputMode(true)}>Reply</p> : undefined}
                    </div>
                </Container>


                {/* TODO: i will add a comment input here for comments reply, and then make api call adding comment id as parent_id */}
            </StyledComment>

            {likesVisibility ?
                <LikesContainer>
                    <p>likes</p>
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
                        <Input type="text" placeholder='Write your reply here...' value={reply.text} name="replyText" onChange={handleInput} />
                        <Button type='button' onClick={createReply}>Confirm</Button>
                    </form>
                    : undefined
                }

                {/* 
                // If this is a comment, and this comment has replies, i will map the 'replies' array.
                // If this is a reply, 'replies' array will be empty so i won't map it 
                */}
                {replies.length > 0 &&
                    replies.map(reply => {
                        return <Comment
                            comment={reply}
                            key={reply.id}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                        />
                    })
                }
            </ReplyContainer>
        </>
    )
}

export default Comment
