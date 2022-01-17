import { useState } from 'react';

export default function useToken() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);

        setToken(userToken);
    };

    return {
        saveToken,
        token
    }
}