import React from 'react'
import styled from 'styled-components'
import Button from '../Button'
import Input from '../Input'
import { Link } from 'react-router-dom'

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

const Login = () => {
    return (
        <StyledLogin>
            <LogoContainer>
                <p>Welcome to (Name TBD)</p>
            </LogoContainer>

            <Form action="">
                <InputFieldset>
                    <Label htmlFor="email">User email</Label>
                    <Input type="email" placeholder="E-mail" id="email" />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password" placeholder="Password" id="password" />

                    <p>Forgot password?</p>
                </InputFieldset>

                <ButtonFieldset>
                    <Link to="/">
                        <Button>Login</Button>
                    </Link>
                    <Button>Sign up</Button>
                </ButtonFieldset>
            </Form>


        </StyledLogin>
    )
}

export default Login
