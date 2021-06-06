import React from 'react'

const Request = ({ person }) => {
    return (
        <div>
            <p>{person.name} {person.surname} wants to add you to friends.</p>
            <button>Accept</button>
            <button>Decline</button>
        </div>
    )
}

export default Request
