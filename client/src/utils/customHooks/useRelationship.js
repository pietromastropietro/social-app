import axios from "axios";
import { useState } from "react";
import { createRelationship, updateRelationship, deleteRelationship } from 'utils/relationshipUtil'

export const useRelationship = () => {
    const [relationship, setRelationship] = useState({ id: '', status: '' });

    const getRelationshipStatus = async (user1Id, user2Id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/relations/users/${user1Id}&${user2Id}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            const relationshipRes = res.data;

            if (!relationshipRes) {
                // no relation exists between users
                setRelationship({ id: '', status: "Send friends request" });
            }

            // Code "0" means a friends request has been sent
            if (relationshipRes.status == 0) {
                // Establish who sent the request and who received it
                if (relationshipRes.user1_id == user1Id) {
                    // user visiting the profile is the sender
                    setRelationship({ id: relationshipRes.id, status: "Request sent" });
                } else {
                    // user visiting the profile is the receiver
                    setRelationship({ id: relationshipRes.id, status: "Friends request received" });
                }
            }

            // Code "1" means users are friends
            if (relationshipRes.status == 1) {
                setRelationship({ id: relationshipRes.id, status: "Friends" });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const sendFriendsRequest = async (user1Id, user2Id) => {
        await createRelationship(user1Id, user2Id);
        getRelationshipStatus(user1Id, user2Id);
    }

    const acceptFriendsRequest = (relationshipId) => {
        updateRelationship(relationshipId);
        setRelationship({ ...relationship, status: 'Friends' });
    }

    const declineFriendsRequest = (relationshipId) => {
        deleteRelationship(relationshipId);
        setRelationship({ ...relationship, status: 'Send friends request' });
    }

    return {
        relationship,
        getRelationshipStatus,
        sendFriendsRequest,
        acceptFriendsRequest,
        declineFriendsRequest
    }
}