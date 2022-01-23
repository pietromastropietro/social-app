import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react'

const StyledLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > p {
        font-size: 12px;
    }

    height: 700px;
`
const LogoContainer = styled.div`
    margin: 120px 0 40px 0;
    & > p {
        font-size: 25px;
    }
`
const InputFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* height: 100px; */
    margin-bottom: 15px;
    & > p {
        font-size: 12px;
        margin-left: 22px;
    }
`
const ButtonFieldset = styled.fieldset`
    width: 160px;
    display: flex;
    justify-content: space-between; 
`
const Label = styled.label`
    /* display: flex; */
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    > fieldset {
        border: none;
    }
`

const Login = ({ setToken }) => {
    const [login, setLogin] = useState(true);

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

    const guestLogin = () => {
        setUser({
            ...user,
            email: "freddie@gmail.com",
            password: "kwbeibcvfwsbc"
        });

        handleLogin();
    }

    const handleLogin = async (e) => {
        if (e) { 
            e.preventDefault();
        }

        try {
            const res = await axios.post('http://localhost:4000/api/login', {
                email: user.email,
                password: user.password
            });

            if (res.data.message === 'Successful login') {
                // save user's data in local storage
                localStorage.setItem('user', JSON.stringify(res.data.user))

                // Set the token sent from the server in localStorage
                setToken(res.data.token);
            } else {
                console.log(res.data.message); // temp
            }
        } catch (err) {
            console.log(err);
        };
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

            // go back to login
            setLogin(true);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <StyledLogin>
            
            <LogoContainer>
                <p>Welcome to sociALLy!</p>
            </LogoContainer>

            {login ?
                <Form onSubmit={handleLogin}>
                    <InputFieldset>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" onChange={handleInput} value={user.email} />

                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" onChange={handleInput} value={user.password} />

                        {/* <p>Forgot password?</p> */}
                    </InputFieldset>

                    <ButtonFieldset>
                        <Button type="submit">Login</Button>
                        <Button onClick={() => setLogin(false)}>Sign up</Button>
                        <Button onClick={guestLogin}>Login as Guest</Button>
                    </ButtonFieldset>
                </Form>
                :
                <Form onSubmit={register}>
                    <InputFieldset>
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input type="text" name="first_name" onChange={handleInput} value={user.first_name} />

                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input type="text" name="last_name" onChange={handleInput} value={user.last_name} />

                        <Label htmlFor="username">Username *</Label>
                        <Input type="text" name="username" onChange={handleInput} value={user.username} />

                        <Label htmlFor="bio">Bio</Label>
                        <textarea name="bio" placeholder='Tell us something about you!' onChange={handleInput} value={user.bio}></textarea>

                        <Label htmlFor="dob">Date of birth *</Label>
                        <Input type="date" name="dob" onChange={handleInput} value={user.dob} />

                        <Label htmlFor="email">Email *</Label>
                        <Input type="email" name="email" onChange={handleInput} value={user.email} />

                        <Label htmlFor="password">Password *</Label>
                        <Input type="password" name="password" onChange={handleInput} value={user.password} />
                    </InputFieldset>

                    <ButtonFieldset>
                        <Button type="submit">Register</Button>
                        <Button onClick={() => setLogin(true)}>Back to log in</Button>
                    </ButtonFieldset>
                </Form>
            }
        </StyledLogin>
    )
}

export default Login
