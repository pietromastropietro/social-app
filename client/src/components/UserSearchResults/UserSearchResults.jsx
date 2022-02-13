import styled from 'styled-components'
import axios from 'axios';
import { useState } from 'react';
import Overlay from 'components/Overlay/Overlay';
import Button from 'components/Button/Button'
import UserLink from 'components/UserLink/UserLink'

const StyledUserSearch = styled.div`
    position: relative;
    width: 100%;
    max-width: 350px;
`
const Searchbar = styled.form`
    box-sizing: border-box;
    display: flex;
    column-gap: 5px;
    height: 40px;
    padding: 4px 4px 4px 20px;
    border-radius: 20px;
    background-color: #eef0f5;

    input {
        background-color: transparent;
        width: 100%;
    }
`
const Results = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    ul {
        overflow: auto;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        margin-bottom: 20px;
        max-width: 500px;
        
        > li {
            margin-right: 20px;
        }
    }

    p {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
    }
`

const UserSearch = () => {
    const [users, setUsers] = useState([])
    const [searchedUser, setSearchedUser] = useState('');
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

    const onSearchSubmit = (e) => {
        e.preventDefault();

        setSearchedUser(searchedUser.trim());
        getUsersByName(searchedUser);
    }

    const closeResults = () => {
        setResultsVisibility(false);
        setSearchedUser('')
    }

    return (
        <StyledUserSearch>
            <Searchbar onSubmit={onSearchSubmit}>
                <input required type="text" placeholder="Search for users..." value={searchedUser} onChange={handleInput} />
                <Button width='45px' type='submit' primary submitPrimary>Go</Button>
            </Searchbar>

            {resultsVisibility ?
                <Overlay>
                    <Results>
                        {!users.length ?
                            <p>No users found</p>
                            :
                            <>
                                <p>Results</p>
                                <ul>
                                    {users.map(user =>
                                        <li key={user.id}>
                                            <div onClick={closeResults}>
                                                <UserLink user={user} />
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </>
                        }
                        <Button primary onClick={closeResults}>Close</Button>
                    </Results>
                </Overlay>
                : undefined
            }
        </StyledUserSearch>
    )
}

export default UserSearch;