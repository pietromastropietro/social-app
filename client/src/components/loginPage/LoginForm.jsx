import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PasswordResetForm from './PasswordResetForm'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    > p {
        color: blue;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        margin: 5px 0 15px 0;
        align-self: flex-end;

        &:hover {
            text-decoration: underline;
        }
    }
`
const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 3px 0; 
`
const Register = styled.p`
    margin-top: 10px;

    > span {
        color: blue;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`
const Divider = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 100%;
    margin: 20px 0;

    > div {
        background-color: #b4b4b4;
        height: 1px;
        width: 100%;
    }
`
const BtnTemp = styled.button`
    background-color: white;
    color: black;
    border: 1px solid grey;
    width: fit-content;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
`

const LoginForm = ({ setLogin, setToken }) => {
    const navigate = useNavigate();
    const [passwordResetMode, setPasswordResetMode] = useState(false);

    const [user, setUser] = useState({
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

    const guestLogin = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/login', {
                email: "freddie@gmail.com",
                password: "kwbeibcvfwsbc"
            });

            if (res.data.message === 'Successful login') {
                // save user's data in local storage
                localStorage.setItem('user', JSON.stringify(res.data.user))

                // Set the token sent from the server in localStorage
                setToken(res.data.token);
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        };
    };

    const handleLogin = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const res = await axios.post('http://localhost:4000/api/login', user);
            console.log(JSON.stringify(user, null, 2));

            console.log(JSON.stringify(res, null, 2));

            if (res.data.message === 'Successful login') {
                // save user's data in local storage
                localStorage.setItem('user', JSON.stringify(res.data.user))

                // Set the token sent from the server in localStorage
                setToken(res.data.token);
                navigate('/')
            }
        } catch (err) {
            console.log(err);
        };
    };

    if (passwordResetMode) {
        return <>
            <BtnTemp onClick={() => setPasswordResetMode(false)}>Go back</BtnTemp>
            <PasswordResetForm />
        </>
    }

    return (
        <>
            <Form onSubmit={handleLogin}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" onChange={handleInput} value={user.email} />

                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" onChange={handleInput} value={user.password} />

                <p onClick={() => setPasswordResetMode(true)}>Forgot your password?</p>

                <Button type="submit">Login</Button>
            </Form>

            <Register>Don't have an account? <span onClick={() => setLogin(false)}>Join us!</span> </Register>

            <Divider>
                <div></div>
                <p>or</p>
                <div></div>
            </Divider>

            <Button onClick={guestLogin}>Login as Guest</Button>
        </>
    )
}

export default LoginForm
