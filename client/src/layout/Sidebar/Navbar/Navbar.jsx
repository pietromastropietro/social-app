import React from 'react'
import styled from 'styled-components'
import { NavLink } from "react-router-dom";
import { boxShadow, radius, breakpoint } from '../../../style'
import homeIcon from 'static/images/home.svg'
import profileIcon from 'static/images/profile.svg'
import logoutIcon from 'static/images/logout.svg'

const Menu = styled.ul`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding: 15px 10px;

    // Styling for desktop
    @media (min-width: ${breakpoint.primary}) {
        border-radius: ${radius.primary};
        ${boxShadow.primary};
    }
    
    // Styling for mobile
    @media (max-width: ${breakpoint.primary}) {
        border-radius: 0 0 ${radius.primary} 0;
    }
    
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
`

const Navbar = ({ type }) => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const userProfilePath = `${user.full_name.split(' ')[0]}-${user.id}`

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

            {type === 'mobile' ?
                <>
                    <li>
                        <NaviLink to={`${userProfilePath}/friends`}>
                            <img src={profileIcon} />
                            <p>Friends</p>
                        </NaviLink>
                    </li>

                    <li>
                        <NaviLink to={`${userProfilePath}/requests`}>
                            <img src={profileIcon} />
                            <p>Requests</p>
                        </NaviLink>
                    </li>
                </>
                : undefined
            }

            <li>
                <NaviLink to='/login' onClick={logout}>
                    <img src={logoutIcon} />
                    <p>Logout</p>
                </NaviLink>
            </li>
        </Menu >
    )
}

export default Navbar
