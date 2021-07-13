import React from 'react'
import styled from 'styled-components'
import Request from './Request'

const Ul = styled.ul`
    list-style-type: none;
    border: 0;
    margin: 0;
    padding: 0;
`

const Requests = () => {
    const requests = [{
        name: 'John',
        surname: 'Smith',
        id: 1
    },
    {
        name: 'Katy',
        surname: 'Fitch',
        id: 2
    }
    ]
    return (
        <div>
            <p>Requests</p>
            <Ul>
                {requests.map(item => <Request person={item}/>)}
            </Ul>
        </div>
    )
}

export default Requests
