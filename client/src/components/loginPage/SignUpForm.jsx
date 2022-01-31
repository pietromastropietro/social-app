import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import axios from 'axios';
import { useState } from 'react'

const Form = styled.form`
    display: flex;
    flex-direction: column;

    > textarea {
        background-color: #eef0f5;
        border-radius: 20px;
        padding: 10px;
    }

    > button {
        margin-top: 15px;
    }
`
const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 3px 0; 
`

const SignUpForm = () => {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        bio: '',
        dob: '',
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const register = async (e) => {
        e.preventDefault();

        // todo: validate user data

        try {
            const res = await axios.post('http://localhost:4000/api/register', user);

            alert(res.data.message); // temp

            // reset all user fields except email
            setUser({
                ...user,
                first_name: '',
                last_name: '',
                username: '',
                bio: '',
                dob: '',
                password: ''
            });
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Form onSubmit={register}>
            <Label htmlFor="first_name">Full Name *</Label>
            <Input type="text" name="first_name" onChange={handleInput} value={user.first_name} />

            {/* <Label htmlFor="first_name">First Name *</Label>
                <Input type="text" name="first_name" onChange={handleInput} value={user.first_name} /> */}

            {/* <Label htmlFor="last_name">Last Name *</Label>
                <Input type="text" name="last_name" onChange={handleInput} value={user.last_name} /> */}

            {/* <Label htmlFor="username">Username *</Label>
                <Input type="text" name="username" onChange={handleInput} value={user.username} /> */}

            {/* <Label htmlFor="bio">Bio</Label>
                <textarea rows='3' name="bio" placeholder='Tell us something about you!' onChange={handleInput} value={user.bio}></textarea> */}

            <Label htmlFor="dob">Date of birth *</Label>
            <Input type="date" name="dob" onChange={handleInput} value={user.dob} />

            <Label htmlFor="email">Email *</Label>
            <Input type="email" name="email" onChange={handleInput} value={user.email} />

            <Label htmlFor="password">Password *</Label>
            <Input type="password" name="password" onChange={handleInput} value={user.password} />

            <Button type="submit">Register</Button>
        </Form>
    )
}

export default SignUpForm
