import styled from 'styled-components'
import Button from 'components/Button/Button'
import UserProfileImage from 'components/UserProfileImage'
import { Link } from 'react-router-dom'

const StyledRequest = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid #d4d4d4;

    &:last-child {
        border: none;
        padding-bottom: 0;
    }
`
const RequestHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    > p {
        margin-left: 10px;
    }
`
const ProfileLink = styled(Link)`
    text-transform: capitalize;
    font-weight: 600;
    word-break: break-all;

    &:hover {
        text-decoration: underline;
    }
`
const Buttons = styled.div`
    display: flex;
    column-gap: 10px;
`

const Request = ({ request, acceptRequest, declineRequest }) => {
    const path = `${request.full_name.split(' ')[0]}-${request.user1_id}`

    return (
        <StyledRequest>
            <RequestHeader>
                <UserProfileImage src={request.profile_img_url} />
                
                <p>
                    <ProfileLink to={`/users/${path}`}>{request.full_name}</ProfileLink>
                    {` wants to add you to friends.`}
                </p>
            </RequestHeader>

            <Buttons>
                <Button primary small onClick={() => acceptRequest(request.id)}>Accept</Button>
                <Button warningOutlined small onClick={() => declineRequest(request.id)}>Decline</Button>
            </Buttons>
        </StyledRequest>
    )
}

export default Request
