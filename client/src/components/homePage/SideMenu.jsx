import React from 'react'
import styled from 'styled-components'
import { NavLink } from "react-router-dom";
import { boxShadow, radius } from '../../style'

import homeIcon from '../../assets/images/home.svg'
import profileIcon from '../../assets/images/profile.svg'
import logoutIcon from '../../assets/images/logout.svg'


const Menu = styled.ul`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding: 15px 10px;
    border-radius: ${radius.primary};
    ${boxShadow.primary}
    
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

const SideMenu = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const userProfilePath = `${user.first_name}${user.last_name}-${user.id}`

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <Menu>
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

            <li>
                <NaviLink to='/login' onClick={logout}>
                    <img src={logoutIcon} />
                    <p>Logout</p>
                </NaviLink>
            </li>
        </Menu>
    )
}

export default SideMenu
