import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Request from './Request/Request'
import { radius, color } from 'style'

const Container = styled.div`
    box-sizing:border-box;
    background-color: white;
    border-radius: ${radius.primary};
    padding: 15px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);

    > p {
        font-size: 18px;
        font-weight: 600;
        margin: 5px 0 10px 0;
    }
`

const Requests = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

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
        try {
            const res = await axios.put(`http://localhost:4000/api/relations/${requestId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message == "Relation updated") {
                updateRequests(requestId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const declineRequest = async (requestId) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/relations/${requestId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message == "Relation deleted") {
                updateRequests(requestId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateRequests = (requestId) => {
        setRequests(oldRequests => [...oldRequests].filter(request => request.id != requestId))
    }

    // don't show requests tab if user has no requests
    if (!requests.length) {
        return null;
    }

    return (
        <Container>
            <p>Requests</p>
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
        </Container>
    )
}

export default Requests
