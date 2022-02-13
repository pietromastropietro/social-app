import axios from "axios";

export const createRelationship = async (user1Id, user2Id) => {
    const usersIds = {
        sender: user1Id,
        receiver: user2Id
    };

    try {
        await axios.post(`http://localhost:4000/api/relations`, usersIds, {
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
        await axios.put(`http://localhost:4000/api/relations/${relationshipId}`, {
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
        await axios.delete(`http://localhost:4000/api/relations/${relationshipId}`, {
            headers: {
                Authorization: (localStorage.getItem('token'))
            }
        });
    } catch (err) {
        console.log(err);
    }
}