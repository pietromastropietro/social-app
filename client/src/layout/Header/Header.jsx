import { useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import logo from 'static/images/headerlogo.png'
import { boxShadow, breakpoint, radius } from 'style'
import menuIcon from 'static/images/menu.svg'
import closeIcon from 'static/images/close1.svg'
import Navbar from 'layout/Sidebar/Navbar/Navbar';
import UserSearch from 'components/UserSearch/UserSearch';
import UserLink from 'components/UserLink/UserLink';

const StyledHeader = styled.header`
    background-color: #ffffff;
    box-shadow: ${boxShadow.primary};
    display: flex;
    justify-content: center;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 1;

    > div {
        width: 100%;
        max-width: 1350px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        margin: 0 15px;
        column-gap: 20px;
    }
`
const LogoLink = styled(Link)`
    display: flex;
    width: fit-content;
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
    width: fit-content;
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
    box-shadow: ${boxShadow.primary};
    border-radius: 0 0 ${radius.primary} 0;
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

const Header = () => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;

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

                <UserLink headerlink="true" user={user} />
            </div>
        </StyledHeader>
    )
}

export default Header
