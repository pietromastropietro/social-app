import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
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

const Comment = ({ comment, createComment, deleteComment, updateComment }) => {
    // const Comment = ({ comment, commentReplies, createComment, deleteComment, updateComment }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [commentData, setCommentData] = useState(comment); // TODO rename this to commentUpdates, and use ONLY for things related to comment edits
    const [editable, setEditable] = useState(false);
    const [replyInputVisibility, setReplyInputVisibility] = useState(false)
    const replies = comment.replies || [];
    // const [replies, setReplies] = useState(comment.replies || []);

    const [reply, setReply] = useState({
        userId: user.id,
        postId: comment.postId || comment.post_id,
        text: "",
        parentId: comment.id
    });

    const lastUpdate = new Date(comment.updated_at || comment.updatedAt).toDateString(); // temp, i need to normalize property names

    // console.log(JSON.stringify(replies, null, 2));

    const submitEdit = (commentData) => {
        setEditable(false);
        updateComment(commentData);
    }

    // todo check if i need async await
    const createReply = async () => {
        setReplyInputVisibility(false);
        await createComment(reply);

        // const replyy = createComment(reply);

        // try {
        //     const res = await axios.post(`http://localhost:4000/api/comments`, reply, {
        //         headers: {
        //             Authorization: (localStorage.getItem('token'))
        //         }
        //     });

        //     if (res.data.message === 'Comment created') {
        //         // // add user full name to new reply
        //         res.data.comment.first_name = user.first_name;
        //         res.data.comment.last_name = user.last_name;

        //         // copy state array and push (add) the new reply
        //         let newReplies = [...replies];
        //         newReplies.push(res.data.comment);

        //         // set the updated replies array as state array to trigger component update 
        //         setReplies(newReplies);


        // reset reply text
        setReply({
            ...reply,
            text: ""
        });

        //         console.log(res.data.message); // temp
        //     }
        // } catch (err) {
        //     console.log(err.message);
        // }
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
                        {user.id == comment.user_id || user.id == comment.userId ? // temp, i need to normalize property names
                            <>
                                <div onClick={() => setEditable(true)}>Edit</div>
                                <div onClick={() => deleteComment(comment.id)}>Delete</div>
                            </>
                            : undefined
                        }
                    </CommentWriter>

                    {editable ?
                        <form>
                            <Input type="text" value={commentData.text} name="commentText" onChange={handleInput} />
                            <Button type='button' onClick={() => submitEdit(commentData)}>Confirm</Button>
                        </form>
                        :
                        <CommentText>

                            <p>{comment.text}</p>
                        </CommentText>
                    }

                    <div>
                        <p>Like</p>
                        {/* // temp, i will normalize property names */}
                        {!comment.parent_id ? !comment.parentId ? <p onClick={() => setReplyInputVisibility(true)}>Reply</p> : undefined : undefined}
                    </div>
                </Container>


                {/* TODO: i will add a comment input here for comments reply, and then make api call adding comment id as parent_id */}
            </StyledComment>

            <ReplyContainer>
                {replyInputVisibility ?
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
