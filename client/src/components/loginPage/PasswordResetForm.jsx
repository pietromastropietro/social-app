import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import { useState } from 'react'
import axios from 'axios'

const Form = styled.form`
    display: flex;
    flex-direction: column;

    > button {
        margin-top: 15px;
    }
`
const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 3px 0; 
`

const PasswordResetForm = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handlePasswordReset = async (e) => {
        try {
            const res = axios.get(`http://localhost:4000/api/users/user?email=${user.email}`)

            if (res.data) {
                // email matches existing user, 'res' contains user's data

            } else {
                // user not found, retry
            }

        } catch (err) {
            console.log(err.message);
        }

    };

    return (
        <>
            <Form onSubmit={handlePasswordReset}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" onChange={handleInput} value={user.email} />

                <Label htmlFor="password">New password</Label>
                <Input type="password" name="password" onChange={handleInput} value={user.password} />

                <Label htmlFor="passwordConfirm">Confirm new password</Label>
                <Input type="password" name="passwordConfirm" onChange={handleInput} value={user.passwordConfirm} />

                <Button type="submit">Change password</Button>
            </Form>
        </>
    )
}

export default PasswordResetForm
