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

const Comment = ({ comment, deleteComment, updateComment }) => {
    console.log("comment called");
    const user = JSON.parse(localStorage.getItem('user'));
    const [commentData, setCommentData] = useState(comment);
    const [editable, setEditable] = useState(false);
    const [replies, setReplies] = useState([]);

    const lastUpdate = new Date(comment.updated_at || comment.updatedAt).toDateString(); // temp, i need to normalize property names

    // console.log(JSON.stringify(comment, null, 2));

    const submitEdit = (commentData) => {
        setEditable(false);
        updateComment(commentData);
    }

    const handleInput = (e) => {
        setCommentData({
            ...commentData,
            text: e.target.value
        });
    }

    const getReplies = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/comments`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            // temp
            // save only replies and not comments (replies have parent_id field with the id of the parent comment)
            const filteredData = res.data.filter(item => item.parent_id && item.parent_id == comment.id);

            setReplies(filteredData)

            // console.log(JSON.stringify(filteredData, null, 2));
            // console.log(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getReplies();
    }, []);

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
                            <Input type="text" value={commentData.text} name="text" onChange={handleInput} />
                            <Button type='button' onClick={() => submitEdit(commentData)}>Confirm</Button>
                        </form>
                        :
                        <CommentText>

                            <p>{comment.text}</p>
                        </CommentText>
                    }

                </Container>

                {/* TODO: i will add a comment input here for comments reply, and then make api call adding comment id as parent_id */}
            </StyledComment>

            <ReplyContainer>
                {/* 
                // If this is a comment, and this comment has replies, i will map the 'replies' array.
                // If this is a reply, 'replies' array will be empty so i won't map it 
                */}
                {replies.length > 0 &&
                    replies.map(reply => {
                        return <Comment comment={reply} />
                    })
                }
            </ReplyContainer>
        </>
    )
}

export default Comment
