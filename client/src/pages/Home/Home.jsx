import React from 'react';
import Feed from 'components/Feed/Feed'
import Requests from 'components/Requests/Requests';
import Suggested from 'components/Suggested/Suggested';
import styled from 'styled-components';

const Sidebar = styled.div`
    width: 250px;
    min-width: 250px;
`

const Home = () => {
    return (
        <>
            <Feed />
            <Sidebar>
                <Requests />
                <Suggested />
            </Sidebar>
        </>
    )
}

export default Home
