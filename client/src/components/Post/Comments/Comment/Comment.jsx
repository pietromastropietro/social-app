import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { handleLike } from 'utils/likeUtil'
import Button from 'components/Button/Button'
import UserProfileImage from 'components/UserProfileImage'
import commentIcon from 'static/images/comment.svg'
import likeIcon from 'static/images/like.svg'
import likedIcon from 'static/images/liked.svg'
import optionIcon from 'static/images/option.svg'
import LikesList from 'components/LikesList/LikesList'
import DeleteDialog from 'components/DeleteDialog/DeleteDialog'
import { getFormattedDate } from 'utils/dateUtil'
import { boxShadow, radius } from 'style'

const StyledComment = styled.div`
    display: flex;
    margin-top: 10px;
    position: relative;
`
const Container = styled.div`
    background-color: #eef0f5;
    border-radius: ${radius.primary};
    padding: 10px;
    margin-left: 10px;
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
        border-radius: ${radius.primary};
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
    box-shadow: ${boxShadow.optionMenu};
    padding: 8px;
    border-radius: ${radius.primary};
    z-index: 1;
    
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
    box-shadow: ${boxShadow.likeCounter};
    padding: 2px 4px 2px 2px;
    
    > img {
        width: 20px;
        height: 20px;
    }
`
const CommentText = styled.p`
    word-break: break-all;
    margin-top: 3px;
`
const ReplyContainer = styled.div`
    margin-left: 55px;
`
const ReplyToggle = styled.p`
    margin: 5px 0 0 10px;
    color: #636363;

    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
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
            border-radius: ${radius.primary};
            width: 100%;
            padding: 10px;
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
    const [repliesVisibility, setRepliesVisibility] = useState(false);
    const [optionMenuVisibility, setOptionMenuVisibility] = useState(false);
    const [deleteDialog, showDeleteDialog] = useState(false);

    const replies = comment.replies || [];
    const [replyInputMode, setReplyInputMode] = useState(false);
    const [reply, setReply] = useState({
        user_id: user.id,
        post_id: comment.post_id,
        text: "",
        parent_id: comment.id
    });

    const lastUpdate = getFormattedDate(comment.updated_at);

    const getCommentLikes = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/likes/comment/${comment.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setCommentLikes(res.data);
            setHasUserLikedComment(res.data.some(elem => elem.user_id == user.id));
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
        setHasUserLikedComment(!hasUserLikedComment);
    };

    const hideDeleteDialog = () => {
        setOptionMenuVisibility(false);
        showDeleteDialog(false);
    }

    const handleCommentEdit = () => {
        setOptionMenuVisibility(false)
        setCommentEditMode(true)
    }

    const handleCommentDelete = () => {
        setOptionMenuVisibility(false)
        showDeleteDialog(false)
        deleteComment(comment)
    }

    const submitCommentEdit = (commentUpdates) => {
        setCommentEditMode(false);
        updateComment(commentUpdates);
    };

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
                <UserProfileImage src={comment.profile_img_url} />

                <div>
                    <Container>
                        <CommentHeader>
                            <div>
                                <p><strong>{comment.full_name}</strong></p>
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
                                    <li onClick={() => showDeleteDialog(true)}>Delete comment</li>
                                </OptionMenu>
                                : undefined
                            }
                        </CommentHeader>

                        {deleteDialog ?
                            <DeleteDialog
                                name="comment"
                                handleConfirm={handleCommentDelete}
                                handleCancel={hideDeleteDialog}
                            />
                            : undefined
                        }

                        {commentEditMode ?
                            <CommentInput>
                                <textarea autoFocus rows='3' cols='35' name="commentText" value={commentUpdates.text} onChange={handleInput} />
                                <Button primary type='button' onClick={() => submitCommentEdit(commentUpdates)}>Confirm</Button>
                            </CommentInput>
                            :
                            <CommentText>{comment.text}</CommentText>
                        }
                    </Container>

                    <CommentFooter>
                        <LikeAndCommentIcons>
                            <img
                                onClick={onCommentLike}
                                src={hasUserLikedComment ? likedIcon : likeIcon}
                            />
                            {!comment.parent_id ?
                                <img
                                    onClick={() => setReplyInputMode(!replyInputMode)}
                                    src={commentIcon}
                                />
                                : undefined
                            }
                        </LikeAndCommentIcons>

                        {commentLikes.length ?
                            <LikesCounter onClick={() => setLikesVisibility(true)}>
                                <img src={likedIcon} />
                                <p>{commentLikes.length}</p>
                            </LikesCounter>
                            : undefined
                        }
                    </CommentFooter>
                </div>

                {likesVisibility ?
                    <LikesList
                        likes={commentLikes}
                        name='comment'
                        setLikesVisibility={setLikesVisibility}
                    />
                    : undefined
                }
            </StyledComment>

            <ReplyContainer>
                {replyInputMode ?
                    <ReplyInput>
                        <UserProfileImage src={user.profile_img_url} />

                        <form onSubmit={createReply}>
                            <textarea required autoFocus rows='2' name="replyText" placeholder='Write your reply here...' value={reply.text} onChange={handleInput} />
                            <Button width='100px' primary>Confirm</Button>
                        </form>
                    </ReplyInput>
                    : undefined
                }

                {/* 
                If this is a comment, and this comment has replies, map the 'replies' array.
                If this is a reply, 'replies' array will be empty so don't map it.
                */}
                {replies.length > 0 ?
                    repliesVisibility ?
                        <>
                            <ReplyToggle onClick={() => setRepliesVisibility(!repliesVisibility)}>
                                Hide replies
                            </ReplyToggle>

                            {replies.map(reply =>
                                <Comment
                                    key={reply.id}
                                    comment={reply}
                                    updateComment={updateComment}
                                    deleteComment={deleteComment}
                                />
                            )}
                        </>
                        :
                        <ReplyToggle onClick={() => setRepliesVisibility(!repliesVisibility)}>
                            {replies.length === 1 ? "Show reply" : `Show ${replies.length} replies`}
                        </ReplyToggle>
                    :
                    undefined
                }
            </ReplyContainer>
        </>
    )
};

export default Comment
