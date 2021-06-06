import React from 'react'

const Contact = ({ info }) => {
    return (
        <div>
            <p>{info.name}, {info.surname}</p>
        </div>
    )
}

export default Contact
