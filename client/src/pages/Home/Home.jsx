import React from 'react';
import Feed from 'components/Feed/Feed'
import Requests from 'components/Requests/Requests';
import Suggested from 'components/Suggested/Suggested';
import styled from 'styled-components';

const Main = styled.div`
    grid-column: 2 / 3;
    margin: 0 15px;
`
const LeftSidebar = styled.div`
    grid-column: 3 / 4;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`

const Home = () => {
    return (
        <>
            <Main>
                <Feed />
            </Main>

            <LeftSidebar>
                <Requests />
                <Suggested />
            </LeftSidebar>
        </>
    )
}

export default Home
