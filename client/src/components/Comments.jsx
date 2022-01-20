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

            // const cmm = formatCommentsData(res.data)

            setComments(formatCommentsData(res.data));




            // // save only replies and not comments (replies have parent_id field with the id of the parent comment)
            // setReplies(res.data.filter(item => item.parent_id));

            // // save only comments and not replies
            // setComments(res.data.filter(comment => !comment.parent_id))

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

        // console.log(JSON.stringify(comments, null, 2));


        // // add only comments to array
        // rawCommentsData.forEach(element => {
        //     // if it's a comment, parent_id field is null
        //     if (!element.parent_id) {
        //         comments.push(element);
        //     }
        // });

        // // add replies to their parent comment
        // rawCommentsData.forEach(element => {
        //     // if it's a reply, parent_id field will contain parent comment's id
        //     if (element.parent_id) {
        //         // get index of parent comment
        //         index = comments.findIndex(comment => comment.id == element.parent_id);

        //         // create replies array field if it doesn't exists
        //         if (!comments[index].replies) {
        //             comments[index].replies = [];
        //         }

        //         // push reply into replies array field
        //         comments[index].replies.push(element);
        //     }
        // });

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

                    // // copy state array and push (add) the new comment
                    // let newComments = [...comments];
                    // newComments.push(res.data.comment);

                    // set the updated comments array as state array to trigger component update 
                    setComments(newComments);

                    // console.log(JSON.stringify(newComments, null, 2));


                    // reset comment text
                    setComment({
                        ...comment,
                        text: ""
                    });
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

    const showAllComments = () => {
        setCommentsToShow(comments.length);
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

            <p onClick={showAllComments}>Show all {comments.length} comments</p>

            {comments.map((commentt, index) => {
                if (index < commentsToShow) {
                    return <Comment
                        comment={commentt}
                        key={commentt.id}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        createComment={createComment}
                    />

                    // // filter replies array to send only replies to this comment
                    // let commentReplies = replies.filter(replyy => replyy.parent_id == commentt.id);

                    // return <Comment
                    //     comment={commentt}
                    //     commentReplies={commentReplies}
                    //     key={commentt.id}
                    //     deleteComment={deleteComment}
                    //     updateComment={updateComment}
                    //     createComment={createComment}
                    // />
                }
            })}
        </StyledComments>
    )
};

export default Comments
