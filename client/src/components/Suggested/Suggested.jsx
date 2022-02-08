import React from 'react'
import styled from 'styled-components'
import { radius, color } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserLink from '../UserLink/UserLink';

const Container = styled.div`
    box-sizing:border-box;
    background-color: ${color.component};
    border-radius: ${radius.secondary};
    padding: 15px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);

    > p {
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

const Suggested = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [suggested, setSuggested] = useState([]);

    const getSuggested = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/${user.id}/suggestions`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                setSuggested(res.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    // fetch all user's friends suggestions
    useEffect(() => {
        getSuggested();
    }, [])

    return (
        <Container>
            <p>Suggested for you</p>
            <ul>
                {suggested.map(person =>
                    <UserLink
                        key={person.id}
                        user={person}
                    />)
                }
            </ul>
        </Container>
    )
}

export default Suggested
