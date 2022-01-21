import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import Button from './Button';
import Comment from './Comment'
import Input from './Input';

const StyledComments = styled.div`
    border-top: 1px solid #a5a5a5;
    margin-top: 10px;
    padding-top: 10px;
`

const Comments = ({ postId, commentInputVisibility, setCommentInputVisibility }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // const [comments, setComments] = useState([]);
    // const [replies, setReplies] = useState([]);

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState({
        userId: user.id,
        postId: postId,
        text: "",
        parent_id: null
    })
    // const [commentInputVisibility, setCommentInputVisibility] = useState(false);

    const [commentsToShow, setCommentsToShow] = useState(4);

    const getCommentsAndReplies = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/comments/post/${postId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });
            
            setComments(formatCommentsData(res.data));

            // console.log(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    const formatCommentsData = (rawCommentsData) => {
        let comments = [];
        let index;

        // Data from db is in descending order, so, looping the array backwards, 
        // i will always find (and add into the comments array) the parent comment first and their replies after
        for (let i = rawCommentsData.length - 1; i >= 0; i--) {
            // if parent_id field is null, rawCommentsData[i] is a comment
            if (!rawCommentsData[i].parent_id) {
                comments.unshift(rawCommentsData[i]);
            } else {
                // rawCommentsData[i] is a reply because parent_id field contains parent comment's id

                // get index of parent comment
                index = comments.findIndex(comment => comment.id == rawCommentsData[i].parent_id);

                // create replies array field if it doesn't exists
                if (!comments[index].replies) {
                    comments[index].replies = [];
                }

                // push reply into replies array field
                comments[index].replies.unshift(rawCommentsData[i]);
            }
        };

        return comments;
    }

    useEffect(() => {
        getCommentsAndReplies();
    }, [])

    const createComment = async (newComment) => {
        setCommentInputVisibility(false);
        try {

            const res = await axios.post(`http://localhost:4000/api/comments`, newComment, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === 'Comment created') {
                // add user full name to new comment
                res.data.comment.first_name = user.first_name;
                res.data.comment.last_name = user.last_name;

                // console.log(JSON.stringify(res.data.comment,null,2));
                if (!res.data.comment.parent_id) {
                    console.log("this was a comment");

                    // copy state array and unshift (add to the beginning) the new comment
                    let newComments = [...comments];
                    newComments.unshift(res.data.comment);

                    // set the updated comments array as state array to trigger component update 
                    setComments(newComments);

                    // console.log(JSON.stringify(newComments, null, 2));


                    // reset comment text
                    setComment({
                        ...comment,
                        text: ""
                    });

                    // reset show/hide more comments button text
                    if (newComments.length <= 5) {
                        setCommentsToShow(4)
                    }
                } else {
                    console.log("this was a reply");

                    // find index of parent comment
                    let index = comments.findIndex(comment => comment.id == res.data.comment.parent_id)

                    // copy state array 
                    let newComments = [...comments];

                    // create replies array field if it doesn't exists
                    if (!newComments[index].replies) {
                        newComments[index].replies = [];
                    }

                    // unshift (add to the beginning) the new reply
                    newComments[index].replies.unshift(res.data.comment);

                    // set the updated array as state array to trigger component update 
                    setComments(newComments);

                    // console.log(JSON.stringify(newComments, null, 2));
                }

                console.log(res.data.message); // temp
            }

            // console.log(JSON.stringify(res.data.comment,null,2));
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteComment = async (comment) => {
        if (window.confirm("Are you sure you want to delete this comment?")) { // temp
            try {
                const res = await axios.delete(`http://localhost:4000/api/comments/${comment.id}`, {
                    headers: {
                        Authorization: (localStorage.getItem('token'))
                    }
                });

                if (res.data.message === "Comment deleted") {
                    if (!comment.parent_id) {
                        console.log("deleting comment");

                        // copy state array and filter (remove) deleted comment
                        let newComments = [...comments].filter(element => element.id != comment.id);

                        // set the updated comments array as state array to trigger component update 
                        setComments(newComments);

                        // console.log(JSON.stringify(newComments, null, 2));
                    } else {
                        console.log("deleting reply");

                        // copy state array 
                        let newComments = [...comments];

                        // find index of parent comment
                        let index = newComments.findIndex(element => element.id == comment.parent_id)

                        newComments[index].replies = newComments[index].replies.filter(element => element.id != comment.id)

                        // set the updated array as state array to trigger component update 
                        setComments(newComments);

                        // console.log(JSON.stringify(newComments, null, 2));
                    }

                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const updateComment = async (comment) => {
        const updatedComment = {
            text: comment.text,
            updated_at: new Date()
        };

        try {
            const res = await axios.put(`http://localhost:4000/api/comments/${comment.id}`, updatedComment, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Comment updated") {
                // console.log("reply");
                // console.log(JSON.stringify(comment, null, 2));

                if (!comment.parent_id) {
                    console.log("this was a comment update");

                    // copy state array and find index of the edited comment
                    let newComments = [...comments];
                    let index = newComments.findIndex(item => item.id === comment.id);

                    // update comment
                    newComments[index] = comment;

                    // set the updated comments array as state array to trigger component update 
                    setComments(newComments);
                } else {
                    console.log("this was a reply update");

                    // find index of parent comment
                    let commentIndex = comments.findIndex(comm => comm.id == comment.parent_id)

                    // console.log("comment index: " + commentIndex);

                    // copy state array 
                    let newComments = [...comments];

                    // console.log(JSON.stringify(newComments, null, 2));

                    // find index of reply
                    let replyIndex = newComments[commentIndex].replies.findIndex(reply => reply.id == comment.id)
                    // console.log("reply index: " + replyIndex);



                    // update edited reply
                    newComments[commentIndex].replies[replyIndex] = comment;

                    // console.log(JSON.stringify(newComments, null, 2));

                    // set the updated array as state array to trigger component update 
                    setComments(newComments);
                }

                console.log(res.data.message); // temp
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentInput = (e) => {
        setComment({
            ...comment,
            text: e.target.value
        });
    };

    const toggleAllComments = () => {
        if (commentsToShow === 4) {
            setCommentsToShow(comments.length);
        } else {
            setCommentsToShow(4);
        }
    }

    return (
        <StyledComments>
            {commentInputVisibility ?
                <div>
                    <form>
                        <Input type="text" placeholder='Write your comment here...' value={comment.text} onChange={handleCommentInput} />
                        <Button type="button" onClick={() => createComment(comment)}>Confirm</Button>
                    </form>
                </div>
                :
                undefined
            }

            {comments.map((commentt, index) => {
                if (index < commentsToShow) {
                    return <Comment
                        comment={commentt}
                        key={commentt.id}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        createComment={createComment}
                    />
                }
            })}
            <p onClick={toggleAllComments}>
                {comments.length > 4 ? commentsToShow === 4 ? `Show all ${comments.length} comments` : "Hide comments" : undefined}
            </p>

        </StyledComments>
    )
};

export default Comments
