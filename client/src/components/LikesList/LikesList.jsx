import Button from "components/Button/Button"
import Overlay from "components/Overlay/Overlay"
import UserLink from "components/UserLink/UserLink"
import { radius } from "style"
import styled from "styled-components"

const List = styled.div`
    box-sizing: border-box;
    background-color: #fff;
    border-radius: ${radius.primary};
    padding: 20px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    p {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    ul {
        overflow: auto;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        margin-bottom: 20px;
        max-width: 500px;
    }
`

const LikesList = ({ likes, name, setLikesVisibility }) => {
    return (
        <Overlay>
            <List>
                <p>Who liked this {name}?</p>
                <ul>
                    {likes.map(like =>
                        <UserLink user={like} key={like.id} />
                    )}
                </ul>
                <Button primary onClick={() => setLikesVisibility(false)}>Close</Button>
            </List>
        </Overlay>
    )
}

export default LikesList