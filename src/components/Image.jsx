import React from 'react'
import styled from 'styled-components'
import tempImage from '../assets/images/temp.jpg'
// TEMP

const StyledImage = styled.img`
    /* background: linear-gradient(to right, #876DE8 0%, #3B85A4 50%, #61C52B 100%);    width: 50px; */
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
