import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Image from 'components/Image'
import { radius, color } from 'style'
import { useState } from 'react'
import axios from 'axios'

const StyledPostInput = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    display: flex;

    > p {
        display: flex;
        align-items: center;
        border-radius: 10px;
        padding: 0 10px;
        width: 100%;
        background-color: #eef0f5;
        margin-left: 10px;
        color: grey;
    }

    > form {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        align-items: flex-end;
        margin-left: 10px;
        width: 100%;

        > fieldset {
            display: flex;
            column-gap: 10px;
            width: 300px;
        }

        > textarea {
            background-color: #eef0f5;
            box-sizing: border-box;
            border-radius: 10px;
            width: 100%;
            padding: 10px;
        }
    }
`

const PostInput = ({ createPost }) => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;
    
    const [post, setPost] = useState({
        text: "",
        image_url: undefined
    });

    const [postImage, setPostImage] = useState();

    const [postInputMode, setPostInputMode] = useState(false);

    // handle post input
    const handleInput = (e) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value
        })
    };

    // handle image input
    const handleImageInput = (e) => {
        setPostImage(e.target.files[0]);
    };

    // handle post form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (postImage === null) {
            return alert("Problems with image, please retry"); // temp
        };

        // Upload image to AWS S3 bucket and get its url
        const imgUrl = await handleImageUpload(postImage);

        if (!imgUrl) {
            return alert("Problems uploading image"); // temp
        }

        setPostInputMode(false);
        createPost(post);

        // reset input fields
        setPost({
            text: "",
            image_url: undefined
        });
    }

    // Upload image to AWS S3 bucket
    const handleImageUpload = async (image) => {
        try {
            // Get a pre-signed AWS url to upload an image
            let res = await axios.get(`http://localhost:4000/api/aws-url?file-name=${image.name}&file-type=${image.type}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            const { url: imgUrl, signedRequest } = res.data.returnData;

            if (!signedRequest) {
                console.log("Couldn't get signed url");
                return;
            }

            // Upload image with the pre-signed url
            res = await axios.put(signedRequest, image, {
                headers: {
                    'Content-Type': image.type
                }
            });

            if (res.status !== 200) {
                console.log("Couldn't upload image");
                return;
            }

            return imgUrl;
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <StyledPostInput>
            <Image />

            {postInputMode ?
                <form onSubmit={handleSubmit}>
                    <textarea autoFocus rows='3' name='text' value={post.text} onChange={handleInput} />
                    
                    <input type="file" name="postImage" onChange={handleImageInput} />

                    <fieldset>
                        <Button primary type='button'>Add an image</Button>
                        <Button primary type='submit'>Post</Button>
                    </fieldset>
                </form>
                :
                <p onClick={() => setPostInputMode(true)}>What's on your mind?</p>
            }
        </StyledPostInput>
    )
}

export default PostInput
