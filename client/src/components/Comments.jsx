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

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        userId: user.id,
        postId: postId,
        text: "",
        parentId: null
    })
    // const [commentInputVisibility, setCommentInputVisibility] = useState(false);

    const [commentsToShow, setCommentsToShow] = useState(4);

    const getComments = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/comments/post/${postId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            // save only comments and not replies (replies have parent_id field with the id of the parent comment)
            setComments(res.data.filter(comment => !comment.parent_id))

            // console.log(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getComments();
    }, [])

    const createComment = async () => {
        setCommentInputVisibility(false);
        try {
            // console.log(JSON.stringify(comment,null,2));

            const res = await axios.post(`http://localhost:4000/api/comments`, comment, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === 'Comment created') {
                // add user full name to new comment
                res.data.comment.first_name = user.first_name;
                res.data.comment.last_name = user.last_name;

                // copy state array and push (add) the new comment
                let newComments = [...comments];
                newComments.push(res.data.comment);

                // set the updated comments array as state array to trigger component update 
                setComments(newComments);

                // reset comment text
                setComment({
                    ...comment,
                    text: ""
                });

                console.log(res.data.message); // temp
            }

            // console.log(JSON.stringify(res.data.comment,null,2));
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) { // temp
            try {
                const res = await axios.delete(`http://localhost:4000/api/comments/${commentId}`, {
                    headers: {
                        Authorization: (localStorage.getItem('token'))
                    }
                });

                if (res.data.message === "Comment deleted") {
                    // copy state array and filter (remove) deleted comment
                    let newComments = [...comments].filter(comment => comment.id != commentId);

                    // set the updated comments array as state array to trigger component update 
                    setComments(newComments);

                    console.log(res.data.message); // temp
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
                // copy state array and find index of the edited comment
                let newComments = [...comments];
                let index = newComments.findIndex(item => item.id === comment.id);

                // update comment
                newComments[index] = comment;

                // set the updated comments array as state array to trigger component update 
                setComments(newComments);

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

    const showAllComments = () => {
        setCommentsToShow(comments.length);
    }

    return (
        <StyledComments>
            {commentInputVisibility ?
                <div>
                    <form>
                        <Input type="text" placeholder='Write your comment here...' value={comment.text} onChange={handleCommentInput} />
                        <Button type="button" onClick={createComment}>Confirm</Button>
                    </form>
                </div>
                :
                undefined
            }

            <p onClick={showAllComments}>Show all {comments.length} comments</p>

            {comments.map((comment, index) => {
                if (index < commentsToShow) {
                    if (!comment.parent_id) { // map only comments and not replies (replies have parent_id field with the id of the parent comment)
                        return <Comment
                            comment={comment}
                            key={comment.id}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                        />
                    }
                }
            })}
        </StyledComments>
    )
};

export default Comments
