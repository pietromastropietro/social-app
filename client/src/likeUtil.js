import axios from "axios";

// Handle user click on 'like' button for comments and posts
export const handleLike = async (user, contentId, likes, contentType) => {
    let likeToRemove_id;

    // Check if user already liked this content
    const didUserLikeContent = likes.some(like => {
        if (like.user_id == user.id) {
            // User already liked this content, so save the like id to remove it later
            likeToRemove_id = like.id;
            return true;
        }
        return false;
    });

    if (didUserLikeContent) {
        const res = await removeLike(likeToRemove_id);

        if (res.err) {
            return console.log(res.err.message);
        }

        // remove the like and return filtered likes array
        return likes.filter(like => like.id != likeToRemove_id);
    } else {
        const res = await createLike(user.id, contentId, contentType);

        if (res.err) {
            return console.log(res.err.message);
        }

        let newLike = res.data;

        // add current user's full name
        newLike.first_name = user.first_name;
        newLike.last_name = user.last_name;
        
        // add new like and return updated array
        return [...likes, newLike]
    }
};

export const createLike = async (userId, contentId, contentType) => {
    const like = {
        user_id: userId,
        post_id: null,
        comment_id: null
    }

    if (contentType === 'post') {
        like.post_id = contentId;
    } else {
        like.comment_id = contentId;
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