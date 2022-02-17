import styled, { css } from "styled-components";
import defaultUserImg from 'static/images/user.svg'

const StyledUserProfileImage = styled.div`
    > img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        
        ${props => props.big && css`
            background-color: red;
            width: 150px;
            height: 150px;
        `}
    }
`

const UserProfileImage = (props) => {
    const imgSrc = props.src || defaultUserImg;

    return (
        <StyledUserProfileImage {...props}>
            <img src={imgSrc} alt="user profile image" />
        </StyledUserProfileImage>
    )
}

export default UserProfileImage
