import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../Button'
import Feed from '../homePage/Feed'
import Left from './Left'
import Right from './Right'

const StyledProfile = styled.div`
    display: flex;
    justify-content: space-between;
`

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')) || undefined;

    const [visitedUserProfileInfo, setVisitedUserProfileInfo] = useState();
    const relationshipStatusCode = ["Request sent", "Friends", "Send friends request"]
    const [relationshipStatus, setRelationshipStatus] = useState(undefined);
    const [relationship, setRelationship] = useState(undefined);

    const [isOwnUserProfile, setIsOwnUserProfile] = useState(undefined);
    const userIdParam = useParams().username.split('-')[1];

    const [buttonsVisibility, setButtonsVisibility] = useState(false);

    const getUserInfo = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/${userId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                setVisitedUserProfileInfo(res.data);
            } else {
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

            // console.log(JSON.stringify(res.data, null, 2));


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
        console.log("rel stat: " + relationshipStatus);

        switch (relationshipStatus) {
            // if friend req is sent, delete req
            case relationshipStatusCode[0]: {
                console.log("1");
                if (window.confirm("Do you really want to delete the friends request?")) {
                    deleteRelationship();
                }
                // delete req
                break;
            }

            // if friend req is accepted, delete req
            case relationshipStatusCode[1]: {
                console.log("2");
                // delete req
                if (window.confirm("Do you really want to remove this friend?")) {
                    deleteRelationship();
                }
                break;
            }

            // if friend req doenst exist create it
            case relationshipStatusCode[2]: {
                console.log("3");
                // create new req
                createRelationship();
                break;
            }

            // if friend req is received, accept or decline it
            case 'Friends request received': {
                setButtonsVisibility(true);
                break;
            }
            // show a dialog box with 'accept' and 'decline' buttons
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

            // console.log(JSON.stringify(res.data, null, 2));

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
            // console.log(JSON.stringify(relationship, null, 2));

            const res = await axios.put(`http://localhost:4000/api/relations/${relationship.id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            // console.log(JSON.stringify(res.data, null, 2));

            if (res.data.message == "Relation updated") {
                setRelationshipStatus(relationshipStatusCode[1])
                setRelationship({ ...relationship, status: 1 });
                setButtonsVisibility(false)
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

            // console.log(JSON.stringify(res.data, null, 2));

            if (res.data.message == "Relation deleted") {
                setRelationshipStatus(relationshipStatusCode[2])
                setRelationship(undefined);
                setButtonsVisibility(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // check if this is logged in user's profile on component mount
        if (userIdParam == user.id) {
            setIsOwnUserProfile(true)
        } else {
            setIsOwnUserProfile(false);
            getUserInfo(userIdParam);
            getRelationshipStatus(user.id, userIdParam);
        };
    }, [])

    return (
        <StyledProfile>
            <Left />
            {isOwnUserProfile ?
                <Feed userId={user.id} />
                :
                relationshipStatus != 'Friends' ?
                    <div>You must be friend with {visitedUserProfileInfo?.first_name} to see the posts.</div>
                    :
                    <Feed userId={userIdParam} />
            }

            {/* if user 2 got a req from user 1, i have to show 'accet req' when user 2 goes on user 1 profile */}
            {!isOwnUserProfile ?
                <>
                    <div onClick={handleRelationship}>
                        {relationshipStatus}
                    </div>

                    {buttonsVisibility ?
                        <div>
                            <Button onClick={updateRelationship}>Accept</Button>
                            <Button onClick={deleteRelationship}>Decline</Button>
                        </div>
                        : undefined
                    }
                </>
                : undefined
            }

            {isOwnUserProfile ?
                <div>Edit</div>
                : undefined
            }

            {/* <Right /> */}
        </StyledProfile>
    )
}

export default Profile
