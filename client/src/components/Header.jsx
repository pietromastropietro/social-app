import React from 'react'
import styled from 'styled-components'
import Button from './Button';
import Input from './Input';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

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
    z-index: 1;
`

const Header = () => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [searchedUser, setSearchedUser] = useState('');
    const [users, setUsers] = useState([])

    const getUsersByName = async (userToSearch) => {
        try {
            const res = await axios.get(
                `http://localhost:4000/api/users/users?first-name=${userToSearch.firstName}&last-name=${userToSearch.lastName}`, {
                headers: { Authorization: (localStorage.getItem('token')) }
            });

            // console.log(JSON.stringify(res.data,null,2));

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

    // TEMP
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <StyledHeader>
            <p>sociALLy</p>

            <form onSubmit={onUserSearchSubmit}>
                <Input type="text" placeholder="Search" value={searchedUser} onChange={handleInput} />
            </form>

            <div>
                <p>Welcome back, {user.first_name}</p>
                <Button onClick={logout}>Logout</Button>
            </div>

            {/* temp */}
            {users.length > 0 &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>
                            <Link to={`users/${user.first_name}${user.last_name}-${user.id}`}>
                                {user.first_name} {user.last_name}
                            </Link>
                        </li>)
                    }
                </ul>
            }
        </StyledHeader>
    )
}

export default Header
