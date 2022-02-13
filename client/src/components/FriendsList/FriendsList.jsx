import React from 'react'
import styled from 'styled-components'
import UserLink from '../UserLink/UserLink'
import { radius, color } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';

const StyledFriendsList = styled.div`
    box-sizing:border-box;
    background-color: ${color.component};
    border-radius: ${radius.secondary};
    padding: 15px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    height: fit-content;
    max-width: 420px;
    width: 100%;

    > h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 5px 0 20px 0;
    }

    > ul {
        display: flex;
        flex-direction: column;
        row-gap: 15px;
    }
`
const FriendsList = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [friends, setFriends] = useState([]);

    const getFriends = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/${user.id}/friends`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                setFriends(res.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    // fetch all user's friends
    useEffect(() => {
        getFriends();
    }, [])

    return (
        <StyledFriendsList>
            <h3>Friends</h3>
            {!friends.length ?
                <p>Your friends will be here</p>
                :
                <ul>
                    {friends.map(friend =>
                        <UserLink
                            key={friend.id}
                            user={friend}
                        />
                    )}
                </ul>
            }
        </StyledFriendsList>
    )
}

export default FriendsList
