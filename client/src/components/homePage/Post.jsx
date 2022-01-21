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
import { createLike, removeLike } from '../../likeUtil'

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
    const [likesVisibility, setLikesVisibility] = useState(false);

    // console.log(JSON.stringify(post, null ,2));

    const [postData, setPostData] = useState(post);
    const [postLikes, setPostLikes] = useState([]);

    const getPostLikes = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/likes/post/${post.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setPostLikes(res.data);

            // console.log(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.log(err);
        }
    };

    //fetch post likes
    useEffect(() => {
        getPostLikes();
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

        // check if postLikes contains a like with user_id matching the id of logged in user
        const hasUserLikedPost = postLikes.some(like => {
            if (like.user_id == user.id || like.userId == user.id) { // temp, will normalize properties name and remove later
                // user already liked this post, so save the like id to remove it later
                likeId = like.id;
                return true;
            };
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

            // add current user's full name
            res.data.first_name = user.first_name;
            res.data.last_name = user.last_name;
            
            // add (push) new like into likes array
            newPostLikes.push(res.data);
        }

        // set the updated likes array as state array to trigger component update 
        setPostLikes(newPostLikes);
    };


    const submitEdit = (postData) => {
        setEditable(false);
        updatePost(postData);
    }

    const toggleLikes = () => {
        setLikesVisibility(!likesVisibility)
    }

    return (
        <StyledPost>
            <PostHeader>
                <Image />
                <PostTitleDate>
                    <p><strong>{author}</strong></p>
                    <p>{date}</p>
                </PostTitleDate>
                {user.id == post.user_id ?
                    <>
                        <div onClick={() => setEditable(true)}>Edit</div>
                        <div onClick={() => deletePost(post.id)}>Delete</div>
                    </>
                    : undefined
                }
            </PostHeader>

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
                <Likes onClick={toggleLikes}>
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

            {likesVisibility ?
                <div>
                    <p>likes</p>
                    <ul>
                        {postLikes.map(like =>
                            <li key={like.id}>
                                {like.first_name} {like.last_name}
                            </li>
                        )}

                    </ul>
                </div>
                : undefined
            }

            <Comments
                postId={post.id}
                commentInputVisibility={commentInputVisibility}
                setCommentInputVisibility={setCommentInputVisibility}
            />

        </StyledPost>
    )
}

export default Post
