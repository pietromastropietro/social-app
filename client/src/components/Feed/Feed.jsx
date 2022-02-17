import { useState, useEffect } from 'react'
import PostInput from 'components/Post/PostInput'
import Post from '../Post/Post'
import styled from 'styled-components'
import axios from 'axios'
import { radius, boxShadow } from 'style'
import { useParams } from 'react-router-dom'
import UserProfileImage from 'components/UserProfileImage'

// temp for testing
import { populateUsers, populatePosts, populateRels } from 'popdb'

const StyledFeed = styled.div`
`
const NewPostInputContainer = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 10px;
    box-shadow: ${boxShadow.primary};
    display: flex;
    column-gap: 10px;

    > p {
        display: flex;
        align-items: center;
        border-radius: ${radius.primary};
        padding: 0 10px;
        width: 100%;
        background-color: #eef0f5;
        color: grey;
    }
`
const NoPostsMsg = styled.p`
    background-color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 10px;
    margin-top: 15px;
    border-radius: ${radius.primary};
    box-shadow: ${boxShadow.primary};
`

const Feed = ({ userId }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const [posts, setPosts] = useState([]);
    const [postInputMode, setPostInputMode] = useState(false);

    const getPosts = async () => {
        let path;

        if (userId) {
            // I'm on the user's profile so show only user's posts
            path = `${process.env.REACT_APP_API_URL}/posts/user/${userId}`
        } else {
            // I'm on the homepage so show all user's post and also friend's ones
            path = `${process.env.REACT_APP_API_URL}/posts/${user.id}`
        };

        try {
            const res = await axios.get(path, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // fetch posts on component mount and on user profile change
    useEffect(() => {
        getPosts();
        // temp for testing
        // populateUsers();
        // populatePosts();
        // populateRels();
    }, [userId]);

    const createPost = async (post) => {
        setPostInputMode(false);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, { userId: user.id, postData: post }, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === 'Post created') {
                console.log("new post: " + JSON.stringify(posts,null,2));
                console.log("new post: " + JSON.stringify(res.data.post,null,2));

                // copy posts state array, add new post at the beginning and update the state array
                setPosts(oldPosts => [res.data.post, ...oldPosts])
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = async (postId) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Post deleted") {
                // copy posts state array and remove deleted post
                setPosts(oldPosts => [...oldPosts].filter(post => post.id != postId))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updatePost = async (post) => {
        const updatedPost = {
            text: post.text,
            image_url: post.image_url,
            updated_at: new Date()
        };

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/posts/${post.id}`, updatedPost, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Post updated") {
                // copy state array, find index of the edited post and update it
                let newPosts = [...posts];
                const index = newPosts.findIndex(editedPost => editedPost.id === post.id);
                newPosts[index] = post;

                // set the updated posts array as state array to trigger component update 
                setPosts(newPosts);
            }
        } catch (err) {
            console.log(err);
        }
    };

    let params = useParams();

    const userIdParam = params?.username?.split('-')[1] || undefined;

    return (
        <StyledFeed>
            {/* 
            Logged in user can create a post only on the homepage or on its personal profile, not on other users' profiles.
            If userIdParam is undefined, user is on the homepage, if it equals logged in user's id, he's on its own profile.
            */}
            {(!userIdParam || userIdParam == user.id) ?
                <NewPostInputContainer>
                    <UserProfileImage src={user.profile_img_url} />

                    {postInputMode ?
                        <PostInput handlePost={createPost} />
                        :
                        <p onClick={() => setPostInputMode(true)}>What's on your mind?</p>
                    }
                </NewPostInputContainer>
                : undefined
            }

            {posts.length ?
                posts.map(post =>
                    <Post
                        key={post.id}
                        postContent={post}
                        deletePost={deletePost}
                        updatePost={updatePost}
                    />)
                :
                <NoPostsMsg>No posts to show</NoPostsMsg>
            }
        </StyledFeed>
    )
}

export default Feed
