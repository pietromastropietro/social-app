import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar/Navbar'
import FriendsList from 'components/FriendsList/FriendsList'
import { breakpoint } from 'style'

const StyledSidebar = styled.div`
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    @media (max-width: ${breakpoint.primary}) {
        display: none;
    }
`

const Sidebar = () => {
    return (
        <StyledSidebar>
            <Navbar desktop />
            <FriendsList />
        </StyledSidebar>
    )
}

export default Sidebar
