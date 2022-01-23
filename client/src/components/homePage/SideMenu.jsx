import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Home';
import Profile from '../profilePage/Profile';
import { boxShadow, radius } from '../../style'


const StyledMenu = styled.nav`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    /* width: 170px; */
    /* height: 250px; */
    padding: 10px;
    border-radius: ${radius.primary};
    /* -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); */
    ${boxShadow.primary}
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
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const userProfilePath = `${user.first_name}${user.last_name}-${user.id}`

    return (
        <StyledMenu>
            <Ul>
                <Li>
                    <NavLink to="/">Home</NavLink>
                </Li>
                <Li>
                    <NavLink to={`users/${userProfilePath}`}>Profile</NavLink>
                </Li>
                <Li>
                    <p>Settings</p>
                </Li>
            </Ul>
        </StyledMenu>
    )
}

export default SideMenu
