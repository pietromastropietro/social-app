import React from 'react'
import Contact from './Contact'

const Contacts = () => {
    const contacts = [{
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
            {contacts.map(item => <Contact info={item} key={item.id}/>)}
        </div>
    )
}

export default Contacts
