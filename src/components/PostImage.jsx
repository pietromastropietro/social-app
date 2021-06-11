import React from 'react'
import styled from 'styled-components'
import tempImage from '../assets/images/temp2.jpg'
// TEMP

const StyledImage = styled.img`
    width: 100%;
    border-radius: 10px;
`

const PostImage = () => {
    return (
        <div>
            <StyledImage src={tempImage} alt="" />
        </div>
    )
}

export default PostImage
