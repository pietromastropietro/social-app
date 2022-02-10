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
import Requests from "components/Requests/Requests";
import FriendsList from "components/FriendsList/FriendsList";
import { breakpoint } from 'style'

const MainContainer = styled.div`
    box-sizing: border-box;
    align-self: center;
    display: grid;
    grid-template-columns: 250px 680px 250px;
    justify-content: center;
    background-color: #f9fafb;
    padding: 15px;
    column-gap: 15px;

    @media (max-width: ${breakpoint.primary}) {
        display: flex;
        width: 100%;
        min-width: 320px;
    }
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

                            {/* following routes are only for mobile */}
                            <Route path="/:username/friends" element={<FriendsList />} />
                            <Route path="/:username/requests" element={<Requests />} />
                        </Routes>
                    </MainContainer>
                </>
            }
        </Context.Provider>
    );
}

export default App;
