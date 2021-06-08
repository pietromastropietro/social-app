import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Home';
import Profile from '../profilePage/Profile';

const StyledMenu = styled.nav`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    width: 170px;
    /* height: 250px; */
    padding: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin: 10px 0;
`;

const SideMenu = () => {
    return (
        <StyledMenu>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <a href="">Settings</a>
        </StyledMenu>
    )
}

export default SideMenu
