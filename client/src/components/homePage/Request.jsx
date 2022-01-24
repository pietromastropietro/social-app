import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Image from '../Image'
import { radius, color } from '../../style'


const StyledRequest = styled.div`
    background-color: white;
    border-radius: ${radius.primary};
    padding: 15px;
    margin: 10px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`
const RequestHeader = styled.div`
    display: flex;    
    margin-bottom: 10px;
`

const Buttons = styled.div`
    display: flex;
    justify-content: space-around;
`

const Name = styled.p`
    align-self: center;
    margin-left: 10px;
`

const Request = ({ user, acceptRequest, declineRequest }) => {

    return (
        <StyledRequest>
            <RequestHeader>
                <Image />
                <Name><strong>{user.first_name} {user.last_name}</strong> wants to add you to friends.</Name>
            </RequestHeader>
            <Buttons>
                <Button onClick={acceptRequest}>Accept</Button>
                <Button onClick={declineRequest}>Decline</Button>
            </Buttons>
        </StyledRequest>
    )
}

export default Request
