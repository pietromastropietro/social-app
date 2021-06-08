import React from 'react'
import styled from 'styled-components'
import Image from '../Image'

const StyledContact = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    padding: 1px 10px;
    margin: 10px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const Contact = ({ info }) => {
    return (
        <StyledContact>
            <Image />            
            <p>{info.name}, {info.surname}</p>
        </StyledContact>
    )
}

export default Contact
