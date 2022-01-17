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

const PostInput = () => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [post, setPost] = useState({
        text: "",
        imgUrl: undefined
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setPost({
            ...post,
            [name]: value
        })
    };

    const createPost = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/posts', {
                userId: user.id,
                postData: post
            });

            if (res.data.message === 'Post created') {
                window.location.reload();
                console.log(res.data.message); // temp
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <StyledPostInput>
            <Image />
            <Input type="text" name="text" onChange={handleInput} placeholder="What's on your mind?"/>
            <Button onClick={createPost}>Post</Button>
        </StyledPostInput>
    )
}

export default PostInput
