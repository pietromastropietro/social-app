import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useState } from 'react';
import logo from 'static/images/headerlogo.png'
import tempImg from 'static/images/temp.jpg'
import { breakpoint } from 'style'
import menuIcon from 'static/images/menu.svg'
import closeIcon from 'static/images/close1.svg'
import Navbar from 'layout/Sidebar/Navbar/Navbar';
import UserSearch from 'components/UserSearchResults/UserSearchResults';

const StyledHeader = styled.header`
    background-color: #ffffff;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 1;

    > div {
        width: 100%;
        max-width: 1350px;
        display: flex;
        justify-content: space-between;
        align-items:center;
        margin: 0 15px;
        column-gap: 20px;
    }
`
const LogoLink = styled(Link)`
    display: flex;
    cursor: pointer;

    > img {
        height: 35px;
    }

    @media (max-width: ${breakpoint.primary}) {
        display: none;
    }
`
const MobileSidebarBtn = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;

    &:hover {
        background-color: #c0c0c0;
    }

    > img {
        height: 20px;
    }

    @media (min-width: ${breakpoint.primary}) {
        display: none;
    }
`
const MobileSidebar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    width: 260px;
    padding-top: 15px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    border-radius: 0 0 10px 0;
    z-index: 1;
	animation: slide 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;

    @keyframes slide {
        0% {
            transform: scaleX(0);
            transform-origin: 0% 0%;
        }
        100% {
            transform: scaleX(1);
            transform-origin: 0% 0%;
        }
    }

    @media (min-width: ${breakpoint.primary}) {
        display: none;
    }
`
const SidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    width: 240px;

    > img {
        height: 28px;

        &:nth-child(2) {
            cursor: pointer;
            opacity: .8;
        }
    }
`
const UserProfileLink = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;
    
    > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    > p {
        text-transform: capitalize;
        font-size: 20px;
        font-weight: 600;

        @media (max-width: ${breakpoint.primary}) {
            display: none;
        }
    }
`

const Header = () => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;
    let profilePath = `${user.full_name.split(' ')[0]}-${user.id}`;

    const [mobileSidebarVisibility, setMobileSidebarVisibility] = useState(false);

    const toggleMobileSidebar = () => {
        if (!mobileSidebarVisibility) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        setMobileSidebarVisibility(!mobileSidebarVisibility);
    }

    const mobileSidebarRef = useRef(null);

    const handleClickOutside = (e) => {
        if (mobileSidebarRef.current && !mobileSidebarRef.current.contains(e.target)) {
            setMobileSidebarVisibility(false);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    };

    return (
        <StyledHeader>
            <div>
                <LogoLink to='/'>
                    <img src={logo} alt="socially website logo" />
                </LogoLink>

                <MobileSidebarBtn onClick={toggleMobileSidebar}>
                    <img src={menuIcon} />
                </MobileSidebarBtn>

                {mobileSidebarVisibility ?
                    <MobileSidebar onClick={toggleMobileSidebar} ref={mobileSidebarRef}>
                        <SidebarHeader>
                            <img src={logo} alt="socially website logo" />
                            <img src={closeIcon} alt="" />
                        </SidebarHeader>
                        
                        <Navbar type='mobile' />
                    </MobileSidebar>
                    : undefined
                }

                <UserSearch />

                <UserProfileLink to={`users/${profilePath}`}>
                    <img src={tempImg} />
                    <p>{user.full_name}</p>
                </UserProfileLink>
            </div>
        </StyledHeader>
    )
}

export default Header
