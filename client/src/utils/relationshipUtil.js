import axios from "axios";

export const createRelationship = async (user1Id, user2Id) => {
    const usersIds = {
        sender: user1Id,
        receiver: user2Id
    };

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/relations`, usersIds, {
            headers: {
                Authorization: (localStorage.getItem('token'))
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateRelationship = async (relationshipId) => {
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/relations/${relationshipId}`, {
            headers: {
                Authorization: (localStorage.getItem('token'))
            }
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteRelationship = async (relationshipId) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/relations/${relationshipId}`, {
            headers: {
                Authorization: (localStorage.getItem('token'))
            }
        });
    } catch (err) {
        console.log(err);
    }
}