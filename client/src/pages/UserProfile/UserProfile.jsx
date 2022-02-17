import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'components/Feed/Feed'
import defaultUserImg from 'static/images/user.svg'
import Button from 'components/Button/Button'
import UserProfileEdit from './UserProfileEdit.jsx/UserProfileEdit'
import { boxShadow, radius } from 'style'
import { useRelationship } from 'utils/customHooks/useRelationship'
import Overlay from 'components/Overlay/Overlay'
import UserProfileImage from 'components/UserProfileImage'

const StyledProfile = styled.div`
    grid-column: 2 / 3;
    width: 100%;
`
const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: ${radius.primary};
    box-shadow: ${boxShadow.primary};
`
const UserName = styled.h2`
    font-size: 40px;
    font-weight: 600;
    text-transform: capitalize;
    text-align: center;
`
const BtnContainer = styled.div`
    display: flex;
    column-gap: 10px;
`
const Bio = styled.p`
    box-sizing: border-box;
    background-color: #eef0f5;
    padding: 10px;
    border-radius: ${radius.primary};
    word-break: break-all;
`
const ProfileBody = styled.div`
`
const NoFriendsMsg = styled.p`
    background-color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 10px;
    border-radius: ${radius.primary};
    box-shadow: ${boxShadow.primary};

    > span {
        text-transform: capitalize;
    }
`
const Dialog = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: #fff;
    border-radius: ${radius.primary};
    padding: 20px;
    text-align: center;
    row-gap: 30px;

    > div {
        display: flex;
        justify-content: space-evenly;
    }
`

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [visitedUserProfileInfo, setVisitedUserProfileInfo] = useState();
    const [isOwnUserProfile, setIsOwnUserProfile] = useState(undefined);
    const [profileEditMode, setProfileEditMode] = useState(false);
    const [relationshipDialog, showRelationshipDialog] = useState(false);
    const userIdParam = useParams().username.split('-')[1];

    const { relationship,
        getRelationshipStatus,
        sendFriendsRequest,
        acceptFriendsRequest,
        declineFriendsRequest
    } = useRelationship();

    const getUserInfo = async (userId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                setVisitedUserProfileInfo(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // check if this is logged in user's profile whenever the 'userId' url param changes
    useEffect(() => {
        if (userIdParam == user.id) {
            setIsOwnUserProfile(true)
        } else {
            setIsOwnUserProfile(false);
            getUserInfo(userIdParam);
            getRelationshipStatus(user.id, userIdParam);
        };
    }, [userIdParam]);

    const handleRelationship = () => {
        if (!relationshipDialog &&
            (relationship.status === "Friends" ||
                relationship.status === "Request sent")
        ) {
            showRelationshipDialog(true);
            return;
        }

        if (relationship.status === "Send friends request") {
            sendFriendsRequest(user.id, userIdParam);
        }
    }

    const handleHoverOnRelationshipStatusBtn = (e) => {
        if (relationship.status == "Friends") {
            e.target.textContent = "Remove"
        } else if (relationship.status == "Request sent") {
            e.target.textContent = "Undo request"
        }
    }

    const handleDeleteRequestConfirmationDialog = () => {
        showRelationshipDialog(false);
        declineFriendsRequest(relationship.id);
    }

    if (isOwnUserProfile) {
        // logged-in user profile
        return (
            <StyledProfile>
                <ProfileHeader>
                    <UserProfileImage big src={user.profile_img_url} />

                    <UserName>
                        {user.full_name}
                    </UserName>

                    <Button width='135px' primaryOutlined onClick={() => setProfileEditMode(!profileEditMode)}>
                        {profileEditMode ? "Close profile Edit" : "Edit profile"}
                    </Button>

                    {user.bio ?
                        <Bio>{user.bio}</Bio>
                        : undefined
                    }
                </ProfileHeader>

                <ProfileBody>
                    {profileEditMode ?
                        <UserProfileEdit userId={user.id} />
                        :
                        <Feed userId={user.id} />
                    }
                </ProfileBody>
            </StyledProfile>
        )
    } else {
        // other user's profile
        return (
            <StyledProfile>
                <ProfileHeader>
                    <UserProfileImage big src={visitedUserProfileInfo?.profile_img_url} />

                    <UserName>
                        {visitedUserProfileInfo?.full_name}
                    </UserName>

                    {relationship.status == 'Friends request received' ?
                        <BtnContainer>
                            <Button width='150px' primary
                                onClick={() => acceptFriendsRequest(relationship.id)}
                            >
                                Accept request
                            </Button>

                            <Button width='150px' warningOutlined
                                onClick={() => declineFriendsRequest(relationship.id)}
                            >
                                Decline request
                            </Button>
                        </BtnContainer>
                        :
                        <Button primaryOutlined width='170px'
                            onMouseOver={handleHoverOnRelationshipStatusBtn}
                            onMouseOut={(e) => e.target.textContent = relationship.status}
                            onClick={handleRelationship}
                        >
                            {relationship.status}
                        </Button>
                    }

                    {relationshipDialog ?
                        <Overlay>
                            <Dialog>
                                <p>{`Do u really want to ${relationship.status === "Friends" ?
                                    "remove this friend?"
                                    :
                                    "delete the friends request?"
                                    }`}
                                </p>

                                <div>
                                    <Button width='60px' warning onClick={handleDeleteRequestConfirmationDialog}>Yes</Button>
                                    <Button width='60px' primaryOutlined onClick={() => showRelationshipDialog(false)}>No</Button>
                                </div>
                            </Dialog>
                        </Overlay>
                        : undefined
                    }

                    {visitedUserProfileInfo?.bio ?
                        <Bio>{visitedUserProfileInfo.bio}</Bio>
                        : undefined
                    }
                </ProfileHeader>

                <ProfileBody>
                    {relationship.status != 'Friends' ?
                        <NoFriendsMsg>
                            You must be friend with <span>{visitedUserProfileInfo?.full_name}</span> to see the posts
                        </NoFriendsMsg>
                        :
                        <Feed userId={userIdParam} />
                    }
                </ProfileBody>
            </StyledProfile >
        )
    }
}

export default UserProfile
