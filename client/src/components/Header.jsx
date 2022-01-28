import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import logo from '../assets/images/headerlogo.png'
import tempImg from '../assets/images/temp.jpg'
import Contact from '../components/homePage/Contact'

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
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items:center;
    }

    input {
        background-color: #eef0f5;
        width: 300px;
        padding: 10px 20px;
        border-radius: 20px;
    }
`
const LogoLink = styled(Link)`
    display: flex;
    cursor: pointer;

    > img {
        height: 35px;
    }
`
const SearchMenu = styled.div`
    position: relative;
    
`
const Results = styled.ul`
    box-sizing: border-box;
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    width: 100%;
    border-radius: 0 0 20px 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-height: 500px;
    overflow: auto;

    > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

`
const UserLink = styled(Link)`
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
    }
    
`

const Header = () => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;
    let profilePath = `${user.first_name}${user.last_name}-${user.id}`;

    const [searchedUser, setSearchedUser] = useState('');
    const [users, setUsers] = useState([])

    const getUsersByName = async (userToSearch) => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/users/users?first-name=${userToSearch.firstName}&last-name=${userToSearch.lastName}`, {
                headers: { Authorization: (localStorage.getItem('token')) }
            });

            if (res.data) {
                setUsers(res.data)
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleInput = (e) => {
        setSearchedUser(e.target.value);
    }

    const onUserSearchSubmit = (e) => {
        e.preventDefault();

        // remove spaces after/before and split into two strings at the middle space, using regex to split regardless of how many spaces in between
        const splitUserStr = searchedUser.trim().split(/ +/);

        const userToSearch = {
            firstName: splitUserStr[0],
            lastName: splitUserStr[1],
        }

        getUsersByName(userToSearch);
    }

    return (
        <StyledHeader>
            <div>
                <LogoLink to='/'>
                    <img src={logo} alt="socially" />
                </LogoLink>

                <SearchMenu>
                    <form onSubmit={onUserSearchSubmit}>
                        <input type="text" placeholder="Search" value={searchedUser} onChange={handleInput} />
                    </form>

                    {users.length > 0 &&
                        <Results>
                            {users.map(user =>
                                <li key={user.id}>
                                    <Contact user={user} />
                                    <button>Add</button>
                                </li>
                            )}
                        </Results>
                    }
                </SearchMenu>

                <UserLink to={`users/${profilePath}`}>
                    <img src={tempImg} />
                    <p>{user.first_name} {user.last_name}</p>
                </UserLink>
            </div>
        </StyledHeader>
    )
}

export default Header
