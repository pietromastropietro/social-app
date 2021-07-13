import React from 'react'
import styled from 'styled-components'
import tempImage from '../assets/images/temp.jpg'
// TEMP

const StyledImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 10px;
`

const Image = () => {
    return (
        <div>
            <StyledImage src={tempImage} alt="" />
        </div>
    )
}

export default Image
