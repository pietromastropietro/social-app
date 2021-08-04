import React from 'react'
import styled from 'styled-components'
import Feed from '../homePage/Feed'
import Left from './Left'
import Right from './Right'

const StyledProfile = styled.div`
    display: flex;
    justify-content: space-between;
`

const Profile = () => {
    return (
        <StyledProfile>
            <Left />
            {/* <Feed /> */}
            {/* <Right /> */}
        </StyledProfile>
    )
}

export default Profile
