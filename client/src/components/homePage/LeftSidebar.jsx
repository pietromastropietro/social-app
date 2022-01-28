import React from 'react'
import styled from 'styled-components'
import Contacts from './Contacts'
import SideMenu from './SideMenu'

const StyledLeftSidebar = styled.div`
    width: 250px;    
    min-width: 250px;
`

const LeftSidebar = () => {
    return (
        <StyledLeftSidebar>
            <SideMenu />
            <Contacts />
        </StyledLeftSidebar>
    )
}

export default LeftSidebar
