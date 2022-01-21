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

const Contacts = ({ users }) => {
    // console.log("users: ",JSON.stringify(users, null ,2));

        return (
            <div>
                <p>Contacts</p>
                <Ul>
                    {/* {users.map(user => <Contact user={user} key={user._id} />)} */}
                    {users.map(user => <Contact user={user} key={user.id} />)}
                </Ul>
            </div>
        )
    //}
}

export default Contacts
