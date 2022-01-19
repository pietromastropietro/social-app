import React, { useReducer } from 'react'
import styled from 'styled-components'
import Image from '../Image'
import PostImage from '../PostImage'
import Comments from '../Comments'
import { radius, color } from '../../style'
import tempImage from '../../assets/images/temp2.jpg'
import { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import axios from 'axios'
import { useEffect } from 'react'

const StyledPost = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 12px;
    margin: 15px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
            box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`
const PostHeader = styled.div`
    display: flex;
    margin-bottom: 10px;
`
const PostTitleDate = styled.div`
    margin-left: 10px;
`
const PostText = styled.div`
    margin-bottom: 10px;
`
const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

const Likes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    & > :last-child {
        font-size: 12px;
    }
`
const Post = ({ post, images, deletePost, updatePost, likePost }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const author = `${post.first_name} ${post.last_name}`

    const dateObj = new Date(post.created_at); // temp
    const date = `${dateObj.toDateString()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;

    // const randomImg = images[Math.floor(Math.random() * 29)].download_url;

    const [editable, setEditable] = useState(false);
    const [commentInputVisibility, setCommentInputVisibility] = useState(false);

    // console.log(JSON.stringify(post, null ,2));

    const [postData, setPostData] = useState(post);
    const [postLikes, setPostLikes] = useState([]);
    // const [comment, setComment] = useState({
    //     userId: user.id,
    //     postId: post.id,
    //     text: "",
    //     parentId: null
    // })

    const getCommentsAndLikes = async () => {
        try {
            const likesRes = await axios.get(`http://localhost:4000/api/likes/content/${post.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            // const commentsRes = await axios.get(`http://localhost:4000/api/likes/content/${post.id}`, {
            //     headers: {
            //         Authorization: (localStorage.getItem('token'))
            //     }
            // });

            setPostLikes(likesRes.data);

            // setPostComments(commentsRes.data);

            // console.log(JSON.stringify(likesRes.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    // useffect to fecth comments and likes
    useEffect(() => {
        getCommentsAndLikes();
    }, []);


    const handleInput = (e) => {
        const { name, value } = e.target;

        setPostData({
            ...postData,
            [name]: value
        });
    }



    const handleLike = async () => {
        // copy state array to add/remove like because state array can't be manipulated directly
        let newPostLikes = [...postLikes];
        let likeId;

        // non mi convince molto perchè affido un controllo importante a un array di stato, secondo me dovrei
        // fare un api call per vedere se il like è presente o meno. nel caso la tengo toglila da qui
        const hasUserLikedPost = postLikes.some(like => {
            // check if user liked a content
            if (like.user_id == user.id || like.userId == user.id) {

                // check if content liked by user is this post
                if (like.post_id == post.id || like.postId == post.id) {
                    // save like id
                    likeId = like.id;
                    return true;
                };
            }
        });

        if (hasUserLikedPost) {
            // user already liked the post, so remove the like
            const res = await removeLike(likeId);

            if (res.err) {
                return console.log(res.err.message);
            }

            // remove (filter) like element from likes array
            newPostLikes = newPostLikes.filter(like => like.id != likeId);

        } else {
            // user neved liked the post, so create new like
            const res = await createLike(user.id, post.id, 'post');

            if (res.err) {
                return console.log(res.err.message);
            }

            // add (push) new like into likes array
            newPostLikes.push(res.data);
        }

        // set the updated likes array as state array to trigger component update 
        setPostLikes(newPostLikes);
    };


    // this function has to be in its own file because i will need it for comments too
    const removeLike = async (contentId) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/likes/${contentId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            return { message: res.data.message }
        } catch (err) {
            return { err: err }
        }
    };

    // this function has to be in its own file because i will need it for comments too
    const createLike = async (userId, contentId, contentType) => {
        const like = {
            userId: user.id,
            postId: null,
            commentId: null
        }

        if (contentType === 'post') {
            like.postId = contentId;
        } else {
            like.commentId = contentId;
        }

        try {
            const res = await axios.post(`http://localhost:4000/api/likes`, like, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            return { data: res.data.like, message: res.data.message };
        } catch (err) {
            return { err: err }
        }
    };

    const submitEdit = (postData) => {
        setEditable(false);
        updatePost(postData);
    }

    // const handleCommentInput = (e) => {
    //     setComment({
    //         ...comment,
    //         text: e.target.value
    //     });
    // }


    // const createComment = async () => {
    //     setCommentInputVisibility(false);
    //     try {
    //         // console.log(JSON.stringify(comment,null,2));

    //         const res = await axios.post(`http://localhost:4000/api/comments`, comment, {
    //             headers: {
    //                 Authorization: (localStorage.getItem('token'))
    //             }
    //         });

    //         // console.log(JSON.stringify(res.data.comment,null,2));
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // };

    return (
        <StyledPost>
            <PostHeader>
                <Image />
                <PostTitleDate>
                    <p><strong>{author}</strong></p>
                    <p>{date}</p>
                </PostTitleDate>
                {user.id === post.user_id ?
                    <>
                        <div onClick={() => setEditable(true)}>Edit</div>
                        <div onClick={() => deletePost(post.id)}>Delete</div>
                    </>
                    : undefined
                }
            </PostHeader>
            {/* <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</PostText> */}
            {/* <PostText>{post.body}</PostText> */}

            {editable ?
                <form>
                    <Input type="text" value={postData.text} name="text" onChange={handleInput} />
                    <Button type='button' onClick={() => submitEdit(postData)}>Confirm</Button>
                </form>
                :
                <PostText>{post.text}</PostText>
            }

            {/* <PostImage src={randomImg} alt=""/> */}
            <PostImage src="" alt="" />
            <PostFooter>
                {/* <div onClick={() => likePost(post.id)}>Heart</div> */}
                <div onClick={handleLike}>Heart</div>
                <Likes>
                    <p><strong>{postLikes.length}</strong></p>
                    <p>Likes</p>
                </Likes>
                <div onClick={() => setCommentInputVisibility(true)}>Comment</div>
            </PostFooter>
            {/* {commentInputVisibility ?
                <div>
                    <form>
                        <Input type="text" placeholder='Write your comment here...' value={comment.text} onChange={handleCommentInput} />
                        <Button type="button" onClick={createComment}>Confirm</Button>
                    </form>
                </div>
                :
                undefined
            } */}

            <Comments
                postId={post.id}
                commentInputVisibility={commentInputVisibility}
                setCommentInputVisibility={setCommentInputVisibility}
            />

        </StyledPost>

        // <StyledPost>
        //     <PostHeader>
        //         <Image />
        //         <PostTitleDate>
        //             <p><strong>{post.author.fullName}</strong></p>
        //             <p>12 hours ago</p>
        //         </PostTitleDate>
        //     </PostHeader>
        //     {/* <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</PostText> */}
        //     <PostText>{post.body}</PostText>
        //     <PostImage src={tempImage} alt=""/>
        //     <PostFooter>
        //         <div>Heart</div>
        //         <Likes>
        //             <p><strong>{post.likes.length}</strong></p>
        //             <p>Likes</p>
        //         </Likes>
        //         <div>Comment</div>
        //     </PostFooter>
        //     <Comments comments={post.comments} />
        // </StyledPost>
    )
}

export default Post
