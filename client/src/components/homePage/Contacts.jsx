import React from 'react'
import styled from 'styled-components'
import Contact from './Contact'
import { radius, color } from '../../style'
import axios from 'axios';
import { useState, useEffect } from 'react';

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
    const [contacts, setContacts] = useState([]);
    // const [error, setError] = useState(null);

    // const contacts = [{
    //     firstName: 'John',
    //     lastName: 'Smith',
    //     _id: 1
    // },
    // {
    //     firstName: 'Katy',
    //     lastName: 'Fitch',
    //     _id: 2
    // }
    // ]

    const getContacts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/');
            setContacts(response.data.users);
        } catch (error) {
            console.error(error);
            //setError(error)
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    //if (error) {
    //    return <div>Error: {error.message}</div>;
    //} else {
        return (
            <div>
                <p>Contacts</p>
                <Ul>
                    {contacts.map(item => <Contact info={item} key={item._id} />)}
                </Ul>
            </div>
        )
    //}
}

export default Contacts
