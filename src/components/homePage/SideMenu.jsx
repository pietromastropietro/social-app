import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Home';
import Profile from '../profilePage/Profile';

const StyledMenu = styled.nav`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    /* width: 170px; */
    /* height: 250px; */
    padding: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const Ul = styled.ul`
    list-style-type: none;
    border: 0;
    margin: 0;
    padding: 0;
`
const Li = styled.li`
    border: 0;
    margin: 0;
    padding: 0;
    margin: 10px 0;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const SideMenu = () => {
    return (
        <StyledMenu>
            <Ul>
                <Li>
                    <NavLink to="/">Home</NavLink>
                </Li>
                <Li>
                    <NavLink to="/profile">Profile</NavLink>
                </Li>
                <Li>
                    <p>Settings</p>
                </Li>
            </Ul>
        </StyledMenu>
    )
}

export default SideMenu
