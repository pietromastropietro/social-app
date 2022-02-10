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
    const relationshipStatusCode = ["Request sent", "Friends", "Send friends request"]
    const [relationshipStatus, setRelationshipStatus] = useState(undefined);
    const [relationship, setRelationship] = useState(undefined);

    const [isOwnUserProfile, setIsOwnUserProfile] = useState(undefined);
    const [profileEditMode, setProfileEditMode] = useState(false);
    const userIdParam = useParams().username.split('-')[1];

    const getUserInfo = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/${userId}`, {
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

    const getRelationshipStatus = async (userOneId, userTwoId) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/relations/users/${userOneId}&${userTwoId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                if (res.data.status == 0) {
                    if (res.data.user1_id == user.id) {
                        setRelationshipStatus(relationshipStatusCode[res.data.status])
                    } else {
                        setRelationshipStatus("Friends request received")
                    }
                } else {
                    setRelationshipStatus(relationshipStatusCode[res.data.status])
                }

                setRelationship(res.data)
            } else {
                setRelationshipStatus(relationshipStatusCode[2]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleRelationship = () => {
        switch (relationshipStatus) {
            // if user already sent a friends request, prompt for removing it
            case relationshipStatusCode[0]: {
                if (window.confirm("Do you really want to delete the friends request?")) {
                    deleteRelationship();
                }
                break;
            }

            // If user is already friends with the other user, prompt for removing him from friends list
            case relationshipStatusCode[1]: {
                if (window.confirm("Do you really want to remove this friend?")) {
                    deleteRelationship();
                }
                break;
            }

            // send new friends request
            case relationshipStatusCode[2]: {
                createRelationship();
                break;
            }
        }
    }

    const createRelationship = async () => {
        try {
            const usersIds = {
                sender: user.id,
                receiver: userIdParam
            };

            const res = await axios.post(`http://localhost:4000/api/relations`, usersIds, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message == "Relation created") {
                setRelationshipStatus(relationshipStatusCode[0])
                setRelationship(res.data.relation)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateRelationship = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/relations/${relationship.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message == "Relation updated") {
                setRelationshipStatus(relationshipStatusCode[1])
                setRelationship({ ...relationship, status: 1 });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteRelationship = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/relations/${relationship.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message == "Relation deleted") {
                setRelationshipStatus(relationshipStatusCode[2])
                setRelationship(undefined);
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

    const handleHoverOnRelationshipStatusBtn = (e) => {
        if (relationshipStatus == "Friends") {
            e.target.textContent = "Remove"
        } else if (relationshipStatus == "Request sent") {
            e.target.textContent = "Undo request"
        }
    }

    if (isOwnUserProfile) {
        // logged-in user profile
        return (
            <StyledProfile>
                <ProfileHeader>
                    <img src={user.profile_img_url ? user.profile_img_url : defaultUserImg} />

                    <UserName>
                        {user.first_name} {user.last_name}
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
                        {visitedUserProfileInfo?.first_name} {visitedUserProfileInfo?.last_name}
                    </UserName>

                    {relationshipStatus == 'Friends request received' ?
                        <BtnContainer>
                            <Button width='150px' primary onClick={updateRelationship}>Accept request</Button>
                            <Button width='150px' warningOutlined onClick={deleteRelationship}>Decline request</Button>
                        </BtnContainer>
                        :
                        <Button primaryOutlined width='170px'
                            onMouseOver={handleHoverOnRelationshipStatusBtn}
                            onMouseOut={(e) => e.target.textContent = relationshipStatus}
                            onClick={handleRelationship}>
                            {relationshipStatus}
                        </Button>
                    }

                    {/* <Bio>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Bio> */}
                    <Bio>{visitedUserProfileInfo?.bio}</Bio>
                </ProfileHeader>

                <ProfileBody>
                    {relationshipStatus != 'Friends' ?
                        <NoFriendsMsg>You must be friend with <span>{visitedUserProfileInfo?.first_name}</span> to see the posts</NoFriendsMsg>
                        :
                        <Feed userId={userIdParam} />
                    }
                </ProfileBody>
            </StyledProfile>
        )
    }
}

export default UserProfile
