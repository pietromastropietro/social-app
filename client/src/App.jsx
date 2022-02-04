import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import useToken from 'services/auth/useToken';
import { createContext } from 'react';
import { useEffect } from 'react';
import Sidebar from './layout/Sidebar/Sidebar';
import LoginIndex from './pages/Login/LoginIndex';
import Header from './layout/Header/Header'
import Home from "./pages/Home/Home";
import UserProfile from './pages/UserProfile/UserProfile'


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
                <LoginIndex setToken={saveToken} />
                :
                <>
                    <Header />

                    <MainContainer>
                        <Sidebar />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/users/:username" element={<UserProfile />} />
                        </Routes>
                    </MainContainer>
                </>
            }
        </Context.Provider>
    );
}

export default App;
