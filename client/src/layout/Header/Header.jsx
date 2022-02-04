import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import logo from 'static/images/headerlogo.png'
import tempImg from 'static/images/temp.jpg'
import Overlay from 'components/Overlay/Overlay';
import Button from 'components/Button/Button'
import UserLink from 'components/UserLink/UserLink'

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
const Results = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    width: 500px;
    border-radius: 20px;
    padding: 20px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    
    ul {
        overflow: auto;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        margin-bottom: 20px;

        > li {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    p {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
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
    }
`
const BtnContainer = styled.div`
    width: 50px;

`

const Header = () => {
    let user = JSON.parse(localStorage.getItem('user')) || undefined;
    let profilePath = `${user.first_name}${user.last_name}-${user.id}`;

    const [searchedUser, setSearchedUser] = useState('');
    const [users, setUsers] = useState([])
    const [resultsVisibility, setResultsVisibility] = useState(false);

    const getUsersByName = async (userToSearch) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/name?name=${userToSearch}`, {
                headers: { Authorization: (localStorage.getItem('token')) }
            });

            if (res.data) {
                setUsers(res.data);
                setResultsVisibility(true);
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

        setSearchedUser(searchedUser.trim());
        getUsersByName(searchedUser);
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

                    {resultsVisibility ?
                        <Overlay>
                            <Results>
                                {!users.length ?
                                    <p>No user found</p>
                                    :
                                    <>
                                        <p>Results</p>
                                        <ul>
                                            {users.map(user =>
                                                <li key={user.id}>
                                                    <div onClick={() => setResultsVisibility(false)}>
                                                        <UserLink user={user} />
                                                    </div>
                                                    <BtnContainer>
                                                        <Button primaryOutlined small>Add</Button>
                                                    </BtnContainer>
                                                </li>
                                            )}
                                        </ul>
                                    </>
                                }
                                <Button primary onClick={() => setResultsVisibility(false)}>Close</Button>
                            </Results>
                        </Overlay>
                        : undefined
                    }

                    {/* {!users.length ?
                        <p>No user found</p>
                        :
                        <Results>
                            {users.map(user =>
                                <li key={user.id}>
                                    <Contact user={user} />
                                    <button>Add</button>
                                </li>
                            )}
                        </Results>
                    } */}
                </SearchMenu>

                <UserProfileLink to={`users/${profilePath}`}>
                    <img src={tempImg} />
                    <p>{user.first_name} {user.last_name}</p>
                </UserProfileLink>
            </div>
        </StyledHeader>
    )
}

export default Header
