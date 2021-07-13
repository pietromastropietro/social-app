import React from 'react'
import styled from 'styled-components'
import Contact from './Contact'
import { radius, color } from '../../style'

const Ul = styled.ul`
    list-style-type: none;
    border: 0;
    margin: 0;
    padding: 0;

    background-color: ${color.component};
    border-radius: ${radius.secondary};
    padding: 15px;
    margin: 10px 0;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1); 
            box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
`

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
            <p>Contacts</p>
            <Ul>
                {contacts.map(item => <Contact info={item} key={item.id} />)}
            </Ul>
        </div>
    )
}

export default Contacts
