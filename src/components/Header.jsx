import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items:center;
    height: 50px;
    border-bottom: 2px solid rgb(216, 216, 216);
`;

const HeaderInput = styled.input`
    height: 10px;
    padding: 10px 20px;
    outline: none;
    border: none;
    border: 1px solid #d3d3d3;
    border-radius: 20px;
`;

const Header = () => {
    return (
        <StyledHeader>
            <p>Social App</p>
            <HeaderInput type="text" name="" placeholder="Search"/>
            <div>placeholder</div>
        </StyledHeader>
    )
}

export default Header
