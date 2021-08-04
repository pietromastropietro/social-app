import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import { Link, useHistory } from 'react-router-dom'
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
    height: 90px;
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
`

const Login = ({ setToken }) => {
    // const history = useHistory();

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = e => {
        const { id, value } = e.target;
        setUser({
            ...user, [id]: value
        });
    };

    const login = async (e) => {
        console.log('API call from Login comp');
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login', {
                username: user.email,
                password: user.password
            });

            //console.log('response:', response);

            if (response.data === 'successful auth') {
                // history.push("/");

                // TODO i have to get the token from server and pass it to setToken. this is temp:
                setToken(true);
            };
        } catch (err) {
            console.log('error:', err);
        };
    };

    return (
        <StyledLogin>
            <LogoContainer>
                <p>Welcome to (Name TBD)</p>
            </LogoContainer>

            <Form onSubmit={login}>
                <InputFieldset>
                    <Label htmlFor="email">User email</Label>
                    <Input type="email" placeholder="E-mail" id="email" onChange={handleInputChange} value={user.email} />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Password" id="password" onChange={handleInputChange} value={user.password} />

                    {/* <p>Forgot password?</p> */}
                </InputFieldset>

                <ButtonFieldset>
                    <Button type="submit">Login</Button>
                    <Button>Sign up</Button>
                </ButtonFieldset>
            </Form>
        </StyledLogin>
    )
}

export default Login
