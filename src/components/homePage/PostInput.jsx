import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Image from '../Image'

const StyledPostInput = styled.div`
    background-color: white;
    border-radius: 10px;
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
    return (
        <StyledPostInput>
            <Image />
            <Input type="text" placeholder="What's on your mind?"/>
            <Button text={'Post'} />
        </StyledPostInput>
    )
}

export default PostInput
