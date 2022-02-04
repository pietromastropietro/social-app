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

    // handle post input
    const handleInput = (e) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value
        })
    };

    // handle post form submit
    const handleSubmit = (post) => {
        setPostInputMode(false);
        createPost(post);

        // reset input fields
        setPost({
            text: "",
            image_url: undefined
        });
    }
    const [postInputMode, setPostInputMode] = useState(false);

    return (
        <StyledPostInput>
            <Image />

            {postInputMode ?
                <form>
                    <textarea autoFocus rows='3' name='text' value={post.text} onChange={handleInput} />
                    <fieldset>
                        <Button primary type='button'>Add an image</Button>
                        <Button primary type='button' onClick={() => handleSubmit(post)}>Post</Button>
                    </fieldset>
                </form>
                :
                <p onClick={() => setPostInputMode(true)}>What's on your mind?</p>
            }
        </StyledPostInput>
    )
}

export default PostInput
