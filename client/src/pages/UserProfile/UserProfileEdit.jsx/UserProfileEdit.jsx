import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Input from 'components/Input'
import axios from 'axios';
import { useState } from 'react'
import { regex } from 'utils/constants/regex';
import { errorMessages } from 'utils/constants/errorMessages'
import { getMaxDob } from 'utils/dateUtil';
import { useEffect } from 'react';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 100%;
    margin: 0 20px;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.1);

    > textarea {
        background-color: #eef0f5;
        border-radius: 20px;
        padding: 10px;
    }

    button {
        margin-top: 10px;
        align-self: center;
    }
`
const InputLabels = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0 2px 0;
    font-size: 14px;
    font-weight: 600;
`
const ErrorMsg = styled.p`
    color: red;
    align-self: flex-end;
`
const PasswordVisibilityCheckbox = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 5px;
`
const UserProfileEdit = ({ userId }) => {
    const [user, setUser] = useState({
        full_name: '',
        dob: '',
        email: '',
        password_hash: '',
        bio: '',
    });

    const getUser = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/${userId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            console.log(JSON.stringify(res.data, null, 2));

            if (res.data) {
                const formattedDob = `${new Date(res.data.dob).getFullYear()}-${new Date(res.data.dob).getMonth() + 1}-${new Date(res.data.dob).getDate()}`

                setUser({
                    full_name: res.data.first_name + ' ' + res.data.last_name, // temp
                    dob: formattedDob,
                    email: res.data.email,
                    password_hash: res.data.password_hash,
                    bio: res.data.bio,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Get user data from backend
    useEffect(() => {
        getUser();
    }, []);


    // state to check form fields validity and show error messages
    const [formValidity, setFormValidity] = useState({
        full_name: true,
        dob: true,
        email: true,
        bio: true,
        password_hash: true,
        password: true,
        passwordConfirm: true,
        passwordEquality: true
    });

    // state to check email availability
    const [emailAvailable, setEmailAvailable] = useState(true);

    const [passwordEditMode, setPasswordEditMode] = useState(false);

    // state and function to toggle password visibility
    const [inputType, setInputType] = useState("password");

    const togglePasswordVisibility = () => {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
    }

    const cancelPasswordChange = () => {
        // reset password to default if user changed it and then cancelled the password change
        setPasswordEditMode(false)
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });

        if (name != 'dob') {
            setFormValidity({
                // reset field validity to hide error message
                ...formValidity,
                [name]: true
            })
        }
    };

    // validate fields when user leaves an input field
    const validateOnBlur = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "full_name":
            case "bio":
            case "email": {
                setFormValidity({
                    ...formValidity,
                    [name]: regex[name].test(value),
                });
                break;
            }
            case "password":
            case "passwordConfirm": {
                setFormValidity({
                    ...formValidity,
                    [name]: regex.password.test(value),
                    passwordEquality: (value === user.passwordConfirm && value === user.password)
                });
                break;
            }
            default:
        }

        // reset email availability to hide error message
        if (!emailAvailable) {
            setEmailAvailable(true);
        }
    };

    const checkFormValidity = (e) => {
        e.preventDefault();

        if (Object.values(formValidity).every(value => value) && emailAvailable) {
            // updateUser();
        }
    };

    const updateUser = async () => {
        try {
            const res = await axios.put(`http://localhost:4000/api/users/${userId}`, user, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Email not available") {
                // show message for unavailable email
                setEmailAvailable(false);
            } else {
                // user updated, go back to user profile
            }
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Form onSubmit={checkFormValidity}>
            <InputLabels>
                <label htmlFor="full_name">Full Name</label>
                <ErrorMsg>{formValidity.full_name || errorMessages.full_name}</ErrorMsg>
            </InputLabels>
            <Input type="text" name="full_name" onChange={handleInput} onBlur={validateOnBlur} value={user.full_name} required />

            <InputLabels>
                <label htmlFor="bio">Bio</label>
                <ErrorMsg>{formValidity.bio || errorMessages.bio}</ErrorMsg>
            </InputLabels>
            <textarea rows='3' name="bio" placeholder='Tell us something about you!' onChange={handleInput} onBlur={validateOnBlur} value={user.bio}></textarea>

            <InputLabels>
                <label htmlFor="dob">Date of birth</label>
            </InputLabels>
            <Input type="date" name="dob" max={getMaxDob()} onChange={handleInput} value={user.dob} required />

            <InputLabels>
                <label htmlFor="email">Email</label>

                <ErrorMsg>
                    {formValidity.email || errorMessages.email}
                    {emailAvailable || errorMessages.emailAvailable}
                </ErrorMsg>
            </InputLabels>
            <Input type="email" name="email" onChange={handleInput} onBlur={validateOnBlur} value={user.email} required />

            {passwordEditMode ?
                <>
                    <InputLabels>
                        <label htmlFor="passwordConfirm">Old password</label>
                        <ErrorMsg>{formValidity.passwordConfirm || errorMessages.password}</ErrorMsg>
                    </InputLabels>
                    <Input type={inputType} name="passwordConfirm" onChange={handleInput} onBlur={validateOnBlur} value={user.passwordConfirm} autoComplete="off" required />

                    <InputLabels>
                        <label htmlFor="passwordConfirm">New password</label>
                        <ErrorMsg>{formValidity.passwordConfirm || errorMessages.password}</ErrorMsg>
                    </InputLabels>
                    <Input type={inputType} name="passwordConfirm" onChange={handleInput} onBlur={validateOnBlur} value={user.passwordConfirm} autoComplete="off" required />

                    <InputLabels><label htmlFor="password">Confirm new password</label></InputLabels>
                    <Input type={inputType} name="password" onChange={handleInput} onBlur={validateOnBlur} value={user.password} autoComplete="off" required />

                    <PasswordVisibilityCheckbox>
                        <input type="checkbox" name="showPassword" onClick={togglePasswordVisibility} />
                        <label htmlFor="showPassword">Show password</label>
                    </PasswordVisibilityCheckbox>
                    
                    <Button primaryOutlined width='220px' onClick={cancelPasswordChange}>Cancel password change</Button>
                </>
                :
                <Button primaryOutlined width='220px' onClick={() => setPasswordEditMode(true)}>Change your password</Button>
            }
            <Button primary width='220px' type="submit">Confirm</Button>
        </Form>
    )
}

export default UserProfileEdit
