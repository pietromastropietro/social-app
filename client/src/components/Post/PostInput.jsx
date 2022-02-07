import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import { useState } from 'react'

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;

    > textarea {
        background-color: #eef0f5;
        box-sizing: border-box;
        border-radius: 10px;
        width: 100%;
        padding: 10px;
    }
`
const BtnFieldset = styled.fieldset`
    display: flex;
    justify-content: space-between;
    column-gap: 10px;

    // temp
    > button {
        width: 150px;
    }
`
const PreviewImage = styled.img`
    align-self: center;
    max-width: 100%;
    heigth: auto;
    border-radius: 10px;
`
const ImageInputLabel = styled.label`
    background-color: #23b7f1;
    color: white;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    width: 150px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s;

    &:hover {
        background-color: #1d99ca;
    }

    > input {
        display: none;
    }
`

const PostInput = ({ originalPost, handlePost }) => {
    const [post, setPost] = useState(originalPost || { text: "", image_url: "" });
    const [postImage, setPostImage] = useState();

    // handle post text input
    const handleInput = (e) => {
        setPost({ ...post, text: e.target.value })
    };

    // handle post image input
    const handleImageInput = (e) => {
        if (postImage) {
            // if user uploaded an image during post editing/creation, remove it
            setPostImage(undefined);
        } else {
            if (post.image_url !== "") {
                // if post already had an image, remove it
                setPost({ ...post, image_url: "" })
            } else {
                // add post image
                setPostImage(e.target.files[0]);
            }
        }
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        let postData = post;

        if (postImage) {
            // Upload image to AWS S3 bucket and get its url
            // const imgUrl = await handleImageUpload(postImage);

            // temp for testing
            const imgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTP2mJsLyALmk94HwCodfgLJ61e_2hseLVBcijATdzywi7d-KfBXH6REiXKS3B8wZtHg&usqp=CAU'

            if (!imgUrl) {
                return alert("Problems uploading image"); // temp
            } else {
                postData.image_url = imgUrl;
            }
        }
        
        handlePost(postData);
    }

    return (
        <PostForm onSubmit={handleSubmit}>
            <textarea autoFocus rows='3' name='text' placeholder="What's on your mind?" value={post.text} onChange={handleInput} />

            {!postImage ?
                post.image_url === "" ?
                    undefined
                    :
                    <PreviewImage src={post.image_url} />
                // <PreviewImage src={tempImg} /> // temp for testing
                :
                <PreviewImage src={URL.createObjectURL(postImage)} />
            }

            <BtnFieldset>
                {!postImage && post.image_url === "" ?
                    <ImageInputLabel htmlFor='postImage'>
                        Add an Image
                        <input type="file" name='postImage' id='postImage' onChange={handleImageInput} accept="image/png, image/jpeg" />
                    </ImageInputLabel>
                    :
                    <Button primary type='button' onClick={handleImageInput}>Remove image</Button>
                }
                <Button primary type='submit'>Post</Button>
            </BtnFieldset>
        </PostForm>
    )
}

export default PostInput