import React from 'react'
import styled, { css } from 'styled-components'
import { NavLink } from "react-router-dom";
import { boxShadow, radius } from '../../../style'

import homeIcon from 'static/images/home.svg'
import profileIcon from 'static/images/profile.svg'
import logoutIcon from 'static/images/logout.svg'


const Menu = styled.ul`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding: 15px 10px;
    
    ${props => props.desktop && css`
        border-radius: ${radius.primary};
        ${boxShadow.primary}
    `}

    ${props => props.mobile && css`
        border-radius: 0 0 ${radius.primary} 0;
    `}
    
    img {
        width: 25px;
        height: 25px;
        opacity: 0.6;
    }
`
const NaviLink = styled(NavLink)`
    display: flex;
    align-items: center;
    column-gap: 15px;
    padding: 10px 20px;
    transition: .2s;
    cursor: pointer;
    border-radius: 10px;
    
    &:hover {
        background-color: #e4e4e4;
    }
    
    &.active {
        background-color: #eef0f5;
    }
`;

const Navbar = (props) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const userProfilePath = `${user.first_name}${user.last_name}-${user.id}`

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <Menu {...props} >
            <li>
                <NaviLink to="/">
                    <img src={homeIcon} />
                    <p>Home</p>
                </NaviLink>
            </li>

            <li>
                <NaviLink to={`users/${userProfilePath}`}>
                    <img src={profileIcon} />
                    <p>Profile</p>
                </NaviLink>
            </li>

            {/* link only for mobile */}
            <li>
                <NaviLink to={`${userProfilePath}/friends`}>
                    <img src={profileIcon} />
                    <p>Friends</p>
                </NaviLink>
            </li>

            {/* link only for mobile */}
            <li>
                <NaviLink to={`${userProfilePath}/requests`}>
                    <img src={profileIcon} />
                    <p>Requests</p>
                </NaviLink>
            </li>

            <li>
                <NaviLink to='/login' onClick={logout}>
                    <img src={logoutIcon} />
                    <p>Logout</p>
                </NaviLink>
            </li>
        </Menu>
    )
}

export default Navbar
