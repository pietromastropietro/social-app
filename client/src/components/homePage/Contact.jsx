import React from 'react'
import styled from 'styled-components'
import Image from '../Image'

const StyledContact = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const Name = styled.p`
    margin-left: 10px;
`

const Contact = ({ info }) => {
    return (
        <StyledContact>
            <Image />            
            <Name>{info.name} {info.surname}</Name>
        </StyledContact>
    )
}

export default Contact
