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

const InputContainer = styled.div`
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

const ButtonContainer = styled.div`
    width: 160px;
    display: flex;
    justify-content: space-between;
    
`

const Login = () => {
    return (
        <StyledLogin>
            <LogoContainer>
                <p>Welcome to (Name TBD)</p>
            </LogoContainer>
            <InputContainer>
                <Input type={"email"} placeholder={"E-mail"} />
                <Input type={"text"} placeholder={"Password"} />
                <p>Forgot password?</p>
            </InputContainer>

            <ButtonContainer>
                <Link to="/">
                    <Button text={'Login'} />
                </Link>
                <Button text={'Sign up'} />
            </ButtonContainer>

        </StyledLogin>
    )
}

export default Login
