import React from 'react'
import styled from 'styled-components'
import Requests from './Requests'
import Suggested from './Suggested'

const StyledRightSidebar = styled.div`
    width: 250px;
    min-width: 250px;

`

const RightSideBar = () => {
    return (
        <StyledRightSidebar>
            <Requests />
            <Suggested />
        </StyledRightSidebar>
    )
}

export default RightSideBar
