import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar/Navbar'
import FriendsList from 'components/FriendsList/FriendsList'

const StyledSidebar = styled.div`
    width: 250px;
    min-width: 250px;
`

const Sidebar = () => {
    return (
        <StyledSidebar>
            <Navbar />
            <FriendsList />
        </StyledSidebar>
    )
}

export default Sidebar
