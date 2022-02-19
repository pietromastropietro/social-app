import styled from 'styled-components'
import { useState } from 'react'
import loginImg from 'static/images/loginImg.png'
import logoImg from 'static/images/logo.png'
import LoginForm from './LoginForm/LoginForm'
import SignUpForm from './SignUpForm/SignUpForm'
import { boxShadow, breakpoint, radius } from 'style'

const StyledLogin = styled.div`
    display: flex;
    justify-content: center;
`
const LoginCard = styled.div`
    background-color: #ffffff;
    display: flex;
    width: 1400px;
    margin: 20px;
    border-radius: ${radius.secondary};
    box-shadow: ${boxShadow};

    @media (max-width: ${breakpoint.primary}) {
        margin: 0;
        padding: 0 20px 20px 20px;
        border-radius: 0;
    }
`
const ImgContainer = styled.figure`
    display: flex;
    width: 50%;
    background: transparent;
    margin: 0;
    
    > img {
        border-radius: 0 ${radius.secondary} ${radius.secondary} 0;
        max-width: 100%;
        height: auto;
    }

    @media (max-width: ${breakpoint.primary}) {
        display: none;
    }
`
const LoginMain = styled.div`
    box-sizing: border-box;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${breakpoint.primary}) {
        width: 100%;
    }
 `
const Logo = styled.img`
    margin-bottom: 20px;
    width: 300px;

    @media (max-width: ${breakpoint.primary}) {
        width: 100%;
    }
`
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin-top: 30px;

    @media (max-width: ${breakpoint.primary}) {
        width: 100%;
        max-width: 500px;
    }
`

const LoginIndex = ({ setToken }) => {
    const [login, setLogin] = useState(true);

    return (
        <StyledLogin>
            <LoginCard>
                <LoginMain>
                    <FormContainer>
                        {login ?
                            <>
                                <Logo src={logoImg} alt="website logo" />
                                <LoginForm setLogin={setLogin} setToken={setToken} />
                            </>
                            :
                            <SignUpForm setLogin={setLogin} />
                        }
                    </FormContainer>
                </LoginMain>

                <ImgContainer>
                    <img src={loginImg} alt="illustration about people interacting with social network features" />
                </ImgContainer>
            </LoginCard>
        </StyledLogin >
    )
}

export default LoginIndex
