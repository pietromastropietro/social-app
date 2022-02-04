import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Input from 'components/Input'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PasswordResetForm from '../PasswordResetForm/PasswordResetForm'

const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const ForgotPassword = styled.p`
    color: blue;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
    align-self: flex-end;

    &:hover {
        text-decoration: underline;
    }
`
const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin: 15px 0 3px 0; 
`
const Register = styled.p`
    margin-top: 5px;

    > span {
        color: blue;
        cursor: pointer;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
`
const WrongCredentials = styled.p`
    color: red;
    font-size: 14px;
    font-weight: 600;
    height: 23px;
`
const Divider = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 100%;
    margin: 15px 0;

    > div {
        background-color: #b4b4b4;
        height: 1px;
        width: 100%;
    }
`
const PasswordVisibilityCheckbox = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 5px;
`

const LoginForm = ({ setLogin, setToken }) => {
    const navigate = useNavigate();

    const [passwordResetMode, setPasswordResetMode] = useState(false);
    const [wrongCredentialsMsg, showWrongCredentialsMsg] = useState(false);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    // state and function to toggle password visibility
    const [inputType, setInputType] = useState("password");

    const togglePasswordVisibility = () => {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });

        // hide wrong credentials msg
        showWrongCredentialsMsg(false);
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
        if (e) e.preventDefault();

        try {
            const res = await axios.post('http://localhost:4000/api/login', user);

            if (res.data.message === 'Successful login') {
                // save user's data in local storage
                localStorage.setItem('user', JSON.stringify(res.data.user))

                // Set the token sent from the server in localStorage
                setToken(res.data.token);
                navigate('/')
            } else {
                showWrongCredentialsMsg(true);
            }
        } catch (err) {
            console.log(err);
        };
    };

    if (passwordResetMode) {
        return <>
            <Button primaryOutlined onClick={() => setPasswordResetMode(false)}>{`< Go back`}</Button>
            <PasswordResetForm setPasswordResetMode={setPasswordResetMode} />
        </>
    }

    return (
        <>

            <Form onSubmit={handleLogin}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" onChange={handleInput} value={user.email} required spellCheck="false" />

                <Label htmlFor="password">Password</Label>
                <Input type={inputType} name="password" onChange={handleInput} value={user.password} required autoComplete="off" />

                <PasswordVisibilityCheckbox>
                    <input type="checkbox" name="showPassword" onClick={togglePasswordVisibility} />
                    <label htmlFor="showPassword">Show password</label>
                </PasswordVisibilityCheckbox>

                <ForgotPassword onClick={() => setPasswordResetMode(true)}>Forgot your password?</ForgotPassword>

                <WrongCredentials>{wrongCredentialsMsg ? "Wrong credentials. Please try again." : undefined}</WrongCredentials>

                <Button primary type="submit">Login</Button>
            </Form>

            <Register>Don't have an account? <span onClick={() => setLogin(false)}>Join us!</span> </Register>

            <Divider>
                <div></div>
                <p>or</p>
                <div></div>
            </Divider>

            <Button primaryOutlined onClick={guestLogin}>Login as Guest</Button>
        </>
    )
}

export default LoginForm
