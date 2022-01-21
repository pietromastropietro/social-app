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
    const user = JSON.parse(localStorage.getItem('user'));
    let params = useParams();
    // let location = useLocation();

    const [isLoggedUser, setIsLoggedUser] = useState();
    const userId = params.username.split('-')[1];

    useEffect(() => {
        if (userId == user.id) {
            // console.log("this is logged in user profile");
            setIsLoggedUser(true);
        }
    }, [])

    // console.log("user id: " + userId);
    // console.log(JSON.stringify(params,null,2));

    return (
        <StyledProfile>
            <Left />
            <Feed userId={userId} />

            <div>Add</div>
            
            {isLoggedUser ?
                <div>Edit</div>
                : undefined
            }
            {/* <Feed userId={user.id} /> */}
            {/* <Right /> */}
        </StyledProfile>
    )
}

export default Profile
