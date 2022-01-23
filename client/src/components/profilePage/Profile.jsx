import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Feed from '../homePage/Feed'
import Left from './Left'
import Right from './Right'

const StyledProfile = styled.div`
    display: flex;
    justify-content: space-between;
`

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [isOwnUserProfile, setIsOwnUserProfile] = useState(undefined);

    const userIdParam = useParams().username.split('-')[1];

    useEffect(() => {
        // check if this is logged in user's profile on component mount
        userIdParam == user.id ? setIsOwnUserProfile(true) : setIsOwnUserProfile(false);
    }, [])

    return (
        <StyledProfile>
            <Left />
            <Feed userId={user.id} />
            
            {/* temp, i'll also have to check friends request status (added, pending etc.) */}
            {!isOwnUserProfile ?
                <div>Add</div>
                : undefined
            }

            {isOwnUserProfile ?
                <div>Edit</div>
                : undefined
            }

            {/* <Right /> */}
        </StyledProfile>
    )
}

export default Profile
