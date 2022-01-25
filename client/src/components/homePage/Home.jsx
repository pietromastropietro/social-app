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
    return (
        <StyledHome>
            <LeftSidebar />
            <Feed  />
            <RightSideBar />
        </StyledHome>
    )
}

export default Home
