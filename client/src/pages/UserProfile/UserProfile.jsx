import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Feed from 'components/Feed/Feed'
import tempImg from 'static/images/temp.jpg'
import Button from 'components/Button/Button'
import UserProfileEdit from './UserProfileEdit.jsx/UserProfileEdit'

const StyledProfile = styled.div`
    max-width: 850px;
    
`
const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 10px;
    margin: 0 20px 20px 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);
    
    > div {
        display: flex;
        align-items: center;
        
        > div {
            width: 500px;
        }

        > img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
        }

        > p {
            text-transform: capitalize;
            font-size: 35px;
            font-weight: 600;
            margin-left: 15px;

            span {
                text-transform: none;
                font-size: 16px;
                font-weight: 500;
                color: grey;
            }
        }
    }
`
const UserName = styled.p`
    text-transform: capitalize;
    font-size: 35px;
    font-weight: 600;
    margin-left: 15px;
`
const Bio = styled.p`
    color: grey;
    margin-left: 15px;
`
const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 135px;
`
const Btn = styled.button`
    cursor: pointer;
    background-color: #e9e8e8;
    padding: 10px 20px;
    border-radius: 10px;
    height: 100%;
    min-width: 90px;
    transition: .2s;

    &:hover {
        background-color: #c5c5c5;
    }
`
const ProfileBody = styled.div`
    display: flex;
    justify-content: space-between;
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
                    <div>
                        <img src={tempImg} />

                        <div>
                            <UserName>
                                {user.first_name} {user.last_name}
                            </UserName>

                            <p>{user.bio}</p>
                        </div>
                    </div>
                    <BtnContainer>
                        <Button primaryOutlined onClick={() => setProfileEditMode(!profileEditMode)}>
                            {profileEditMode ? "Close profile Edit" : "Edit profile"}
                        </Button>
                    </BtnContainer>
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
                    <div>
                        <img src={tempImg} />

                        <div>
                            <UserName>
                                {visitedUserProfileInfo?.first_name} {visitedUserProfileInfo?.last_name}
                            </UserName>

                            <Bio>{visitedUserProfileInfo?.bio}</Bio>
                        </div>
                    </div>

                    {relationshipStatus == 'Friends request received' ?
                        <BtnContainer>
                            <Button primary onClick={updateRelationship}>Accept request</Button>
                            <Button warningOutlined onClick={deleteRelationship}>Decline request</Button>
                        </BtnContainer>
                        :
                        <Button primaryOutlined
                            onMouseOver={handleHoverOnRelationshipStatusBtn}
                            onMouseOut={(e) => e.target.textContent = relationshipStatus}
                            onClick={handleRelationship}>
                            {relationshipStatus}
                        </Button>
                    }
                </ProfileHeader>

                <ProfileBody>
                    {relationshipStatus != 'Friends' ?
                        <div>You must be friend with {visitedUserProfileInfo?.first_name} to see the posts.</div>
                        :
                        <Feed userId={userIdParam} />
                    }
                </ProfileBody>
            </StyledProfile>
        )
    }
}

export default UserProfile
