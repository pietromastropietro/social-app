import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar/Navbar'
import FriendsList from 'components/FriendsList/FriendsList'

const StyledSidebar = styled.div`
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
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
