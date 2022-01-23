import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Image from '../Image'
import { radius, color } from '../../style'
import { useState } from 'react'
import axios from 'axios'

const StyledPostInput = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 10px 20px;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
`

const Input = styled.input`
    width: 100%;
    height: 10px;
    padding: 10px 20px;
    outline: none;
    border: none;
`;

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
        createPost(post);

        // reset input fields
        setPost({
            text: "",
            image_url: undefined
        });
    }

    return (
        <StyledPostInput>
            <Image />

            <form>
                <Input type="text" name="text" value={post.text} onChange={handleInput} placeholder="What's on your mind?" />
                <Button type='button' onClick={() => handleSubmit(post)}>Post</Button>
            </form>
        </StyledPostInput>
    )
}

export default PostInput
