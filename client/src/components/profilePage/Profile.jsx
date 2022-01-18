import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
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

    return (
        <StyledProfile>
            <Left />
            <Feed userId={user.id} />
            {/* <Right /> */}
        </StyledProfile>
    )
}

export default Profile
