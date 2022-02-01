import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import loginImg from '../../assets/images/loginImg.png'
import logoImg from '../../assets/images/logo.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const StyledLogin = styled.div`
    display: flex;
    justify-content: center;
    background-color: #eeeeee;
`
const LoginCard = styled.div`
    background-color: #ffffff;
    display: flex;
    width: 1400px;
    // todo: remove this when adding media queries
    min-height: 530px;
    margin: 20px 100px;
    border-radius: 20px;

`
const ImgContainer = styled.figure`
    display: flex;
    width: 50%;
    background: transparent;
    margin: 0;
    
    > img {
        border-radius: 20px 0 0 20px;
        max-width: 100%;
        height: auto;
        // todo: remove this when adding media queries
        min-height: 530px;
    }
`
const LoginMain = styled.div`
    box-sizing: border-box;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        width: 60%;
    }
`
const LogoContainer = styled.figure`
    margin: 30px 0 20px 0;

    > img {
        width: 300px;
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

const Login = ({ setToken }) => {
    const [login, setLogin] = useState(true);

    return (
        <StyledLogin>
            <LoginCard>
                <ImgContainer>
                    <img src={loginImg} alt="illustration about people interacting with social network features" />
                </ImgContainer>

                <LoginMain>
                    <LogoContainer>
                        <img src={logoImg} alt="website logo" />
                    </LogoContainer>

                    <div>
                        {login ?
                            <LoginForm setLogin={setLogin} setToken={setToken} />
                            :
                            <>
                                <BtnTemp onClick={() => setLogin(true)}>{`< Go back`}</BtnTemp>
                                <SignUpForm setLogin={setLogin} />
                            </>
                        }
                    </div>
                </LoginMain>
            </LoginCard>
        </StyledLogin>
    )
}

export default Login
