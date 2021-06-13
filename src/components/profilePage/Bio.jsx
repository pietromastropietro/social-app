import React from 'react'
import styled from 'styled-components'
import { radius, color } from '../../style'


const StyledBio = styled.nav`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 170px;
    padding: 10px;
    border-radius: ${radius.primary};
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const Bio = () => {
    return (
        <StyledBio>
            <p>Bio</p>
            <p>about me about me  about me about me about me about me about me about me</p>
        </StyledBio>
    )
}

export default Bio
