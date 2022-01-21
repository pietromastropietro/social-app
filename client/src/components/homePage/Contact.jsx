import React from 'react'
import { Link } from 'react-router-dom'
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
    const fullName = `${user.first_name} ${user.last_name}`
    const path = `${user.first_name}${user.last_name}-${user.id}`

    return (
        <StyledContact>
            <Image />
            {/* <Name>{user.fullName}</Name> */}
            <Link to={`users/${path}`}>
                <Name>{fullName}</Name>
            </Link>
        </StyledContact>
    )
}

export default Contact
