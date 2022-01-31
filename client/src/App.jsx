import Button from './components/Button';
import Home from './components/homePage/Home';
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Profile from './components/profilePage/Profile';
import Header from './components/Header';
import styled from 'styled-components';
import Login from './components/loginPage/Login';
import GlobalStyle from './GlobalStyle';
import useToken from './useToken';
import { createContext } from 'react';
import { useState } from 'react';
import LeftSidebar from './components/homePage/LeftSidebar';
import { useEffect } from 'react';

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    background-color: #f9fafb;
    width: 90%;
    padding: 15px 20px;
`

// Context export
export const Context = createContext();

const App = () => {
    const navigate = useNavigate();
    const { token, saveToken } = useToken();
    const contextValues = {};

    useEffect(() => {
        if (!token) {
            navigate('login', { replace: true });
        }
    }, [])

    return (
        <Context.Provider value={contextValues}>
            <GlobalStyle />

            {!token ?
                <Login setToken={saveToken} />
                :
                <>
                    <Header />

                    <MainContainer>
                        <LeftSidebar />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/users/:username" element={<Profile />} />
                        </Routes>
                    </MainContainer>
                </>
            }
        </Context.Provider>
    );
}

export default App;
