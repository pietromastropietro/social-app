import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Request from './Request'

const Ul = styled.ul`
    list-style-type: none;
    border: 0;
    margin: 0;
    padding: 0;
`

const Requests = () => {
    const [requests, setRequests] = useState([]);

    const getFriendsRequests = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/xxx`, {
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
        // getFriendsRequests();
    }, []);

    const acceptRequest = () => {

    }

    const declineRequest = () => {

    }

    return (
        <div>
            <p>Requests</p>
            <Ul>
                {requests.map(request =>
                    <Request
                        key={request.id}
                        user={request}
                        acceptRequest={acceptRequest}
                        declineRequest={declineRequest}
                    />)
                }
            </Ul>
        </div>
    )
}

export default Requests
