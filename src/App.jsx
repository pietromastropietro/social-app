import './App.css';
import Button from './components/Button';
import Home from './components/homePage/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from './components/profilePage/Profile';
import Header from './components/Header';

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
