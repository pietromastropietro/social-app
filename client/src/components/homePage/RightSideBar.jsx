import React from 'react'
import styled from 'styled-components'
import Contacts from './Contacts'
import Requests from './Requests'

const StyledRightSidebar = styled.div`
    width: 22%;
`

const RightSideBar = ({ users }) => {
    return (
        <StyledRightSidebar>
            <Requests />
            <Contacts users={users} />
        </StyledRightSidebar>
    )
}

export default RightSideBar
