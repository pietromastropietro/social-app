import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Image from '../Image'

const StyledUserLink = styled.li`
    display: flex;
    align-items: center;
    column-gap: 10px;
`
const ProfileLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    text-transform: capitalize;
    word-break: break-all;

    &:hover {
        text-decoration: underline;
    }
`

const UserLink = ({ user }) => {
    const path = `${user.full_name.split(' ')[0]}-${user.id}`

    return (
        <StyledUserLink>
            <Image />
            <ProfileLink to={`/users/${path}`}>
                {user.full_name}
            </ProfileLink>
        </StyledUserLink>
    )
}

export default UserLink
