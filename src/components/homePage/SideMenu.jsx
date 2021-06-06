import React from 'react'
import styled from 'styled-components'

const StyledMenu = styled.nav`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 170px;
    height: 250px;
    padding: 10px;
    border-radius: 10px;
`

const SideMenu = () => {
    return (
        <StyledMenu>
            <a href="">Home</a>
            <a href="">Profile</a>
            <a href="">Settings</a>
        </StyledMenu>
    )
}

export default SideMenu
