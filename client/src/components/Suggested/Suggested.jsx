import styled from 'styled-components'
import { radius, color, boxShadow } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserLink from '../UserLink/UserLink';

const Container = styled.div`
    box-sizing:border-box;
    background-color: ${color.primary};
    border-radius: ${radius.primary};
    padding: 15px;
    box-shadow: ${boxShadow.primary};

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
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}/suggestions`, {
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
