import React from 'react'
import Request from './Request'

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
            {requests.map(item => <Request person={item}/>)}
        </div>
    )
}

export default Requests
