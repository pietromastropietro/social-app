import styled from 'styled-components'
import UserLink from '../UserLink/UserLink'
import { radius, color, boxShadow } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';

const StyledFriendsList = styled.div`
    box-sizing:border-box;
    background-color: ${color.primary};
    border-radius: ${radius.primary};
    padding: 5px;
    box-shadow: ${boxShadow.primary};
    height: fit-content;
    max-width: 420px;
    width: 100%;

    > h3 {
        padding: 10px 0 0 10px;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 20px 0;
    }

    > p {
        padding: 0 0 10px 10px;
    }

    > ul {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }
`
const FriendsList = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [friends, setFriends] = useState([]);

    const getFriends = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}/friends`, {
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
                        <li key={friend.id}>
                            <UserLink user={friend} />
                        </li>
                    )}
                </ul>
            }
        </StyledFriendsList>
    )
}

export default FriendsList
