import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Image from 'components/Image'
import { radius, color } from 'style'
import { Link } from 'react-router-dom'

const StyledRequest = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid #d4d4d4;

    &:last-child {
        border: none;
        padding-bottom: 0;
    }
`
const RequestHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    > p {
        margin-left: 10px;
    }
`
const ProfileLink = styled(Link)`
    text-transform: capitalize;
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`
const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
`

const Request = ({ request, acceptRequest, declineRequest }) => {
    const username = `${request.first_name} ${request.last_name}`;
    const path = `${request.first_name}${request.last_name}-${request.user1_id}`

    return (
        <StyledRequest>
            <RequestHeader>
                <Image />
                <p>
                    <ProfileLink to={`users/${path}`}>{username}</ProfileLink>
                    {` wants to add you to friends.`}
                </p>
            </RequestHeader>

            <Buttons>
                <Button theme='primary' onClick={() => acceptRequest(request.id)}>Accept</Button>
                <Button onClick={() => declineRequest(request.id)}>Decline</Button>
            </Buttons>
        </StyledRequest>
    )
}

export default Request
