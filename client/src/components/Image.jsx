import React from 'react'
import styled from 'styled-components'
import tempImage from '../assets/images/temp.jpg'
// TEMP

const StyledImage = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
`

const Image = () => {
    return (
        <div>
            <StyledImage src={tempImage} alt="" />
        </div>
    )
}

export default Image
