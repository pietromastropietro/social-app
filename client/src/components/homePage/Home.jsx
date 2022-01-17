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
        posts: [],
        photos: []
    });

    const getHomepageData = async () => {
        console.log('API call from Home component');
        try {
            // const response = await axios.get('http://localhost:4000/', {
            //     headers: {
            //         Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            //     }
            // });
            // const postRes = await axios.get("https://jsonplaceholder.typicode.com/posts");
            const postRes = await axios.get('http://localhost:4000/api/posts');
            const userRes = await axios.get("https://jsonplaceholder.typicode.com/users");
            const imgRes = await axios.get("https://picsum.photos/v2/list");

            // console.log("postres: ",JSON.stringify(imgRes.data, null ,2));

            setHomepageData({
                users: userRes.data,
                posts: postRes.data.slice(0, 20),
                photos: imgRes.data
                
            });
            // setHomepageData({
            //     users: response.data.users,
            //     posts: response.data.posts
            // });
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
            <Feed posts={homepageData.posts} images={homepageData.photos} />
            <RightSideBar users={homepageData.users} images={homepageData.photos} />
        </StyledHome>
    )
}

export default Home
