import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Image from '../Image'

const StyledContact = styled.li`
    display: flex;
    align-items: center;
    column-gap: 10px;
`
const ProfileLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    text-transform: capitalize;
    word-break: break-all;

    &:hover {
        text-decoration: underline;
    }
`

const UserLink = ({ user }) => {
    const fullName = `${user.first_name} ${user.last_name}`
    const path = `${user.first_name}${user.last_name}-${user.id}`

    return (
        <StyledContact>
            <Image />
            <ProfileLink to={`/users/${path}`}>
                {fullName}
            </ProfileLink>
        </StyledContact>
    )
}

export default UserLink
