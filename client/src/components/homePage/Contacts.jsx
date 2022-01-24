import React from 'react'
import styled from 'styled-components'
import Contact from './Contact'
import { radius, color } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Ul = styled.ul`
    list-style-type: none;
    border: 0;
    margin: 0;
    padding: 0;

    background-color: ${color.component};
    border-radius: ${radius.secondary};
    padding: 15px;
    margin: 10px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
            box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

const Contacts = ({ users }) => {
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
        // getFriends();
    }, [])

    return (
        <div>
            <p>Friends</p>
            <Ul>
                {friends.map(friend =>
                    <Contact
                        key={friend.id}
                        user={friend}
                    />)
                }
                {/* {users.map(user =>
                    <Contact
                        key={user.id}
                        user={user}
                    />)
                } */}
            </Ul>
        </div>
    )
    //}
}

export default Contacts
