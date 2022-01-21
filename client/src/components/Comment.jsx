import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { createLike, removeLike } from '../likeUtil'
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
        parent_id: comment.id
    });

    const lastUpdate = new Date(comment.updated_at || comment.updatedAt).toDateString(); // temp, i need to normalize property names

    // console.log(JSON.stringify(replies, null, 2));

    const [commentLikes, setCommentLikes] = useState([]);

    const getCommentLikes = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/likes/comment/${comment.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setCommentLikes(res.data);

            // console.log(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    //fetch post likes
    useEffect(() => {
        getCommentLikes();
    }, []);

    const handleLike = async () => {
        // copy state array to add/remove like because state array can't be manipulated directly
        let newCommentLikes = [...commentLikes];
        let likeId;

        // check if commentLikes contains a like with user_id matching the id of logged in user
        const hasUserLikedComment = commentLikes.some(like => {
            if (like.user_id == user.id || like.userId == user.id) { // temp, will normalize properties name and remove later
                // user already liked this comment, so save the like id to remove it later
                likeId = like.id;
                return true;
            };
        });

        if (hasUserLikedComment) {
            // user already liked the comment, so remove the like
            const res = await removeLike(likeId);

            if (res.err) {
                return console.log(res.err.message);
            }

            // remove (filter) like element from likes array
            newCommentLikes = newCommentLikes.filter(like => like.id != likeId);

        } else {
            // user neved liked the comment, so create new like
            const res = await createLike(user.id, comment.id, 'comment');

            if (res.err) {
                return console.log(res.err.message);
            }

            // add (push) new like into likes array
            newCommentLikes.push(res.data);
        }

        // set the updated likes array as state array to trigger component update 
        setCommentLikes(newCommentLikes);
    };



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
                                <div onClick={() => deleteComment(comment)}>Delete</div>
                            </>
                            : undefined
                        }
                        <p>-{commentLikes.length}</p>
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
                        <p onClick={handleLike}>Like</p>
                        {/* // temp, i will normalize property names */}
                        {!comment.parent_id ? <p onClick={() => setReplyInputVisibility(true)}>Reply</p> : undefined}
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
