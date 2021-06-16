import React from 'react'
import styled from 'styled-components'
import Button from './Button';
import Input from './Input';
import { Link } from "react-router-dom";


const StyledHeader = styled.header`
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items:center;
    height: 50px;
    /* border-bottom: 2px solid rgb(216, 216, 216); */
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
`;

const Header = () => {
    return (
        <StyledHeader>
            <p>Social App</p>
            <Input type="text" placeholder="Search" />
            <div>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                placeholder</div>
        </StyledHeader>
    )
}

export default Header
