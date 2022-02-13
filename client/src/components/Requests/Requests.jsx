import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Request from './Request/Request'
import { radius, color } from 'style'
import { updateRelationship, deleteRelationship } from 'utils/relationshipUtil';
import { useLocation } from 'react-router-dom'

const StyledRequests = styled.div`
    box-sizing: border-box;
    background-color: white;
    border-radius: ${radius.primary};
    padding: 15px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    max-width: 420px;
    width: 100%;
    height: fit-content;

    > h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 5px 0 10px 0;
    }
`

const Requests = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;
    const path = useLocation().pathname;

    const [requests, setRequests] = useState([]);

    const getFriendsRequests = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/relations/users/${user.id}/requests`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                setRequests(res.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    // fetch all user's friends requests
    useEffect(() => {
        getFriendsRequests();
    }, []);

    const acceptRequest = async (requestId) => {
        updateRelationship(requestId);
        updateRequests(requestId);
    }

    const declineRequest = async (requestId) => {
        deleteRelationship(requestId);
        updateRequests(requestId);
    }

    const updateRequests = (requestId) => {
        setRequests(oldRequests => [...oldRequests].filter(request => request.id != requestId))
    }

    // Don't show requests tab if user has no requests and he's on the homepage in desktop mode
    if (!requests.length && path === '/') {
        return null;
    }

    return (
        <StyledRequests>
            <h3>Requests</h3>
            {!requests.length ?
                <p>You have no friends request now</p>
                :
                <ul>
                    {requests.map(request =>
                        <Request
                            key={request.id}
                            request={request}
                            acceptRequest={acceptRequest}
                            declineRequest={declineRequest}
                        />
                    )}
                </ul>
            }
        </StyledRequests>
    )
}

export default Requests
