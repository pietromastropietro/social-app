import styled from 'styled-components'
import { radius, color, boxShadow } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserLink from '../UserLink/UserLink';

const StyledSuggested = styled.div`
    box-sizing:border-box;
    background-color: ${color.primary};
    border-radius: ${radius.primary};
    padding: 5px;
    box-shadow: ${boxShadow.primary};

    > p {
        padding: 10px 0 0 10px;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    > ul {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
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

    // if there are no users to suggest, don't show component
    if (!suggested.length) {
        return null;
    }

    return (
        <StyledSuggested>
            <p>Suggested for you</p>
            <ul>
                {suggested.map(person =>
                    <li key={person.id}>
                        <UserLink user={person} />
                    </li>
                )}
            </ul>
        </StyledSuggested>
    )
}

export default Suggested
