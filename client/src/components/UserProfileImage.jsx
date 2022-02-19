import styled, { css } from "styled-components";
import defaultUserImg from 'static/images/user.svg'

const StyledUserProfileImage = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    
    ${props => props.big && css`
        width: 150px;
        height: 150px;
    `}

    ${props => props.medium && css`
        width: 90px;
        height: 90px;
    `}
`

const UserProfileImage = (props) => {
    const imgSrc = props.src || defaultUserImg;

    return (
        <StyledUserProfileImage
            {...props}
            src={imgSrc}
            alt="user profile image"
        />
    )
}

export default UserProfileImage
