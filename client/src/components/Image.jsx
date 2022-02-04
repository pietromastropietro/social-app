import React from 'react'
import styled from 'styled-components'
import tempImage from 'static/images/temp.jpg'
// TEMP

const StyledImage = styled.div`
    width: 45px;
    height: 45px;
    
    > img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
`

const Image = () => {
    return (
        <StyledImage>
            <img src={tempImage} alt="" />
        </StyledImage>
    )
}

export default Image
