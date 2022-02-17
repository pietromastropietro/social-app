import Feed from 'components/Feed/Feed'
import Requests from 'components/Requests/Requests';
import Suggested from 'components/Suggested/Suggested';
import styled from 'styled-components';
import { breakpoint } from 'style'

const Main = styled.div`
    grid-column: 2 / 3;
    width: 100%;
    box-sizing: content-box;
`
const LeftSidebar = styled.div`
    grid-column: 3 / 4;
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    @media (max-width: ${breakpoint.primary}) {
        display: none;
    }
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
