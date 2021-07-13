import React from 'react'
import styled from 'styled-components'
import SideMenu from './SideMenu'

const StyledLeftSidebar = styled.div`
    width: 20%;
`

const LeftSidebar = () => {
    return (
        <StyledLeftSidebar>
            <SideMenu />
        </StyledLeftSidebar>
    )
}

export default LeftSidebar
