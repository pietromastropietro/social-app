import React from 'react';
import Contacts from './Contacts';
import Requests from './Requests';
import SideMenu from './SideMenu';
import Header from '../Header'
import PostInput from './PostInput';
import Feed from './Feed';
import styled from 'styled-components';
import LeftSidebar from './LeftSidebar';
import RightSideBar from './RightSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StyledHome = styled.div`
    display: flex;
    justify-content: space-between;
`

const Home = () => {
    const [homepageData, setHomepageData] = useState({
        users: [],
        posts: []
    });

    const getHomepageData = async () => {
        console.log('API call from Home component');
        try {
            const response = await axios.get('http://localhost:4000/');

            setHomepageData({
                users: response.data.users,
                posts: response.data.posts
            });
        } catch (error) {
            console.error(error);
            //setError(error)
        }
    };

    useEffect(() => {
        getHomepageData();
    }, []);

    return (
        <StyledHome>
            <LeftSidebar />
            <Feed posts={homepageData.posts} />
            <RightSideBar users={homepageData.users} />
        </StyledHome>
    )
}

export default Home
