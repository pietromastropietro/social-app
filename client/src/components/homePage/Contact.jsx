import React from 'react'
import styled from 'styled-components'
import Image from '../Image'

// TODO list all users, and show friends first and then all the other users

const StyledContact = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const Name = styled.p`
    margin-left: 10px;
`

const Contact = ({ user }) => {
    return (
        <StyledContact>
            <Image />            
            <Name>{user.fullName}</Name>
        </StyledContact>
    )
}

export default Contact
