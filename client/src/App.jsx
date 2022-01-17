import Button from './components/Button';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from './components/profilePage/Profile';
import Header from './components/Header';
import styled from 'styled-components';
import Login from './components/loginPage/Login';
import GlobalStyle from './GlobalStyle';
import useToken from './useToken';
import { createContext } from 'react';
import { useState } from 'react';

const MainContainer = styled.div`
    align-self: center;
    background-color: #f9fafb;
    width: 80%;
    padding: 15px 20px;
`

// Context export
export const Context = createContext();

const App = () => {
    const { token, saveToken } = useToken();

    const contextValues = { };

    if (!token) {
        return <Login setToken={saveToken} />;
    }

    return (
        <Context.Provider value={contextValues}>
        <>
            <GlobalStyle />
            {/* <Router> */}
            <Header />
            <MainContainer>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    {/* <Route path="/login">
                        <Login setToken={setToken} />
                    </Route> */}
                </Switch>
            </MainContainer>
            {/* </Router> */}

        </>
        </Context.Provider>
    );
}

export default App;
