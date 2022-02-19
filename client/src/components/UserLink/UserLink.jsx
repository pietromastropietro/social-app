import { Link } from 'react-router-dom'
import { breakpoint, radius } from 'style'
import styled, { css } from 'styled-components'
import UserProfileImage from '../UserProfileImage'

const StyledUserLink = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 5px;
    text-transform: capitalize;
    word-break: break-all;
    transition: .2s;
    cursor: pointer;

    &:hover {
        background-color: #e4e4e4;
        border-radius: ${radius.primary};
    }

    ${ props => props.headerlink && css`
        font-weight: 600;
        font-size: 20px;
        justify-self: flex-end;

        > p {
            @media (max-width: ${breakpoint.primary}) {
                display: none;
            }
        }
    `}
`

const UserLink = (props) => {
    const { user } = props;
    const path = `${user.full_name.split(' ')[0]}-${user.id}`

    return (
        <StyledUserLink to={`/users/${path}`} {...props}>
            <UserProfileImage src={user.profile_img_url} />
            <p>{user.full_name}</p>
        </StyledUserLink>
    )
}

export default UserLink
