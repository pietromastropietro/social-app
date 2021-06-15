import Button from './components/Button';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from './components/profilePage/Profile';
import Header from './components/Header';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './components/loginPage/Login';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Lato', sans-serif;
        /* display: flex;
        justify-content: center; */
        background-color: #eef0f5;
        margin: 0;
        padding: 0;
        border: 0;
    }
    #root {
        /* background-color: #f9fafb;
        width: 80%;
        padding: 0 20px; */
        display: flex;
        flex-direction: column;
    }
    p {
        margin: 0;
        padding: 0;
        border: 0;
    }
`;

const MainContainer = styled.div`
    align-self: center;
    background-color: #f9fafb;
    width: 80%;
    padding: 15px 20px;
`

function App() {
    return (
        <>
        <GlobalStyle />
        <Router>
            <Header />
            <MainContainer>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </MainContainer>
        </Router>
        </>
    );
}

export default App;
