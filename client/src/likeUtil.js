import axios from "axios";

export const removeLike = async (contentId) => {
    try {
        const res = await axios.delete(`http://localhost:4000/api/likes/${contentId}`, {
            headers: {
                Authorization: (localStorage.getItem('token'))
            }
        });

        return { message: res.data.message }
    } catch (err) {
        return { err: err }
    }
};

export const createLike = async (userId, contentId, contentType) => {
    const like = {
        userId: userId,
        postId: null,
        commentId: null
    }

    if (contentType === 'post') {
        like.postId = contentId;
    } else {
        like.commentId = contentId;
    }

    try {
        const res = await axios.post(`http://localhost:4000/api/likes`, like, {
            headers: {
                Authorization: (localStorage.getItem('token'))
            }
        });

        return { data: res.data.like, message: res.data.message };
    } catch (err) {
        return { err: err }
    }
};