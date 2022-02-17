import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'components/Feed/Feed'
import defaultUserImg from 'static/images/user.svg'
import Button from 'components/Button/Button'
import UserProfileEdit from './UserProfileEdit.jsx/UserProfileEdit'
import { breakpoint } from 'style'
import { useRelationship } from 'utils/customHooks/useRelationship'
import Overlay from 'components/Overlay/Overlay'

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
    border-radius: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);

    > img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
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
    border-radius: 10px;
    word-break: break-all;
`
const ProfileBody = styled.div`
`
const NoFriendsMsg = styled.p`
    background-color: #fff;
    font-weight: 600;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);

    > span {
        text-transform: capitalize;
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
                    <img src={user.profile_img_url ? user.profile_img_url : defaultUserImg} />

                    <UserName>
                        {user.full_name}
                    </UserName>

                    <Button width='135px' primaryOutlined onClick={() => setProfileEditMode(!profileEditMode)}>
                        {profileEditMode ? "Close profile Edit" : "Edit profile"}
                    </Button>

                    <Bio>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Bio>
                    {/* <Bio>{user.bio}</Bio> */}
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
                    <img src={visitedUserProfileInfo?.profile_img_url ? visitedUserProfileInfo?.profile_img_url : defaultUserImg} />

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
                            <p>
                                {`Do u really want to 
                                ${relationship.status === "Friends" ?
                                        "remove this friend?" : "delete the friends request?"
                                    }
                            `}
                            </p>
                            <Button warning onClick={handleDeleteRequestConfirmationDialog}>Yes</Button>
                            <Button primaryOutlined onClick={() => showRelationshipDialog(false)}>No</Button>
                        </Overlay>
                        : undefined
                    }

                    {/* <Bio>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Bio> */}
                    <Bio>{visitedUserProfileInfo?.bio}</Bio>
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
            </StyledProfile>
        )
    }
}

export default UserProfile
