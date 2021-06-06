import React from 'react';
import Contacts from './Contacts';
import Requests from './Requests';
import SideMenu from './SideMenu';
import Header from '../Header'
import PostInput from './PostInput';
import Feed from './Feed';

const Home = () => {
    return (
        <div>
            <Header />
            <SideMenu />
            <PostInput />
            <Feed />
            <Requests />
            <Contacts />
        </div>
    )
}

export default Home
