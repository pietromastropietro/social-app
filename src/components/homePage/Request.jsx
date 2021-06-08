import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Image from '../Image'

const StyledRequest = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    margin: 10px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`
const RequestHeader = styled.div`
    display: flex;    
    margin-bottom: 10px;
`

const Request = ({ person }) => {
    return (
        <StyledRequest>
            <RequestHeader>
                <Image />
                <p>{person.name} {person.surname} wants to add you to friends.</p>
            </RequestHeader>

            <Button text={'Accept'} />
            <Button text={'Decline'} />
        </StyledRequest>
    )
}

export default Request
