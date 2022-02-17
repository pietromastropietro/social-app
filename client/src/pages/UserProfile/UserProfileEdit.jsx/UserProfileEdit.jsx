import styled from 'styled-components'
import Button from 'components/Button/Button'
import Input from 'components/Input'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { regex } from 'utils/constants/regex';
import { errorMessages } from 'utils/constants/errorMessages'
import { getDateForInputElement, getMaxDob } from 'utils/dateUtil';
import defaultUserImg from 'static/images/user.svg'
import tempImg from 'static/images/temp.jpg'
import { boxShadow, radius } from 'style';

const Form = styled.form`
    box-sizing:border-box;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 10px 20px;
    border-radius: ${radius.primary};
    box-shadow: ${boxShadow.primary};

    > textarea {
        background-color: #eef0f5;
        border-radius: ${radius.input};
        padding: 10px;
    }

    button {
        margin-top: 10px;
        align-self: center;
    }
`
const ImageFieldset = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    row-gap: 10px;
`
const PreviewImage = styled.img`
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
`
const ImageInputLabel = styled.label`
    background-color: #23b7f1;
    color: white;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    width: 150px;
    padding: 10px;
    border-radius: ${radius.primary};
    cursor: pointer;
    transition: .2s;

    &:hover {
        background-color: #1d99ca;
    }

    > input {
        display: none;
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
        bio: '',
        profile_img_url: '',
        oldPassword: '',
        newPassword: '',
        passwordConfirm: '',
    });

    const [userImage, setUserImage] = useState();

    const getUser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data) {
                // Get formatted date suitable for input html element's default value
                const formattedDob = getDateForInputElement(new Date(res.data.dob));

                setUser({
                    ...user,
                    full_name: res.data.full_name,
                    dob: formattedDob,
                    email: res.data.email,
                    bio: res.data.bio || "",
                    profile_img_url: res.data.profile_img_url || ""
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
        newPassword: true,
        passwordConfirm: true,
        passwordEquality: true
    });

    // state to check email availability
    const [emailAvailable, setEmailAvailable] = useState(true);

    // state to check if user wrote his old password correctly
    const [wrongOldPassword, setWrongOldPassword] = useState(false);

    // state to toggle form to change user password
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

    const cancelPasswordEdit = () => {
        // reset password field
        setUser({
            ...user,
            oldPassword: '',
            newPassword: '',
            passwordConfirm: ''
        });

        // reset form validity
        setFormValidity({
            ...formValidity,
            newPassword: true,
            passwordConfirm: true,
            passwordEquality: true
        });

        // hide password inputs
        setPasswordEditMode(false)
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value });

        if (name != 'dob' && name != 'oldPassword') {
            setFormValidity({
                // reset field validity to hide error message
                ...formValidity,
                [name]: true
            })
        }

        // reset field to hide message for wrong old user password
        if (wrongOldPassword) {
            setWrongOldPassword(false);
        }
    };

    // handle user profile image input
    const handleImageInput = (e) => {
        if (userImage) {
            // remove image previously uploaded by user
            setUserImage(undefined);
        } else {
            if (user.profile_img_url) {
                // remove old profile image
                setUser({ ...user, profile_img_url: "" })
            } else {
                // add new profile image
                setUserImage(e.target.files[0]);
            }
        }
    };

    // validate fields when user leaves an input field
    const validateOnBlur = (e) => {
        const { name, value } = e.target;

        switch (name) {
            // case "bio":
            case "full_name":
            case "email": {
                setFormValidity({
                    ...formValidity,
                    [name]: regex[name].test(value),
                });
                break;
            }
            case "newPassword":
            case "passwordConfirm": {
                setFormValidity({
                    ...formValidity,
                    [name]: regex.password.test(value),
                    passwordEquality: (value === user.passwordConfirm && value === user.newPassword)
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

        if (Object.values(formValidity).every(value => value)
            && emailAvailable
            && (!wrongOldPassword)
        ) {
            updateUser();
        }
    };

    const updateUser = async () => {
        try {
            let updatedUser = user;

            if (userImage) {
                // user changed his profile image, upload it and save its url

                // Upload image to AWS S3 bucket and get its url
                // const imgUrl = await handleImageUpload(userImage);

                // temp
                const imgUrl = ''

                if (!imgUrl) {
                    return alert("Problems uploading image"); // temp
                } else {
                    updatedUser.profile_img_url = imgUrl;
                }
            }

            // delete now useless fields
            delete updatedUser.passwordConfirm;

            const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, updatedUser, {
                headers: {
                    Authorization: (localStorage.getItem('token'))
                }
            });

            if (res.data.message === "Passwords don't match") {
                // user wants to change his password but the old one he inputted and the one from db don't match, show error msg
                return setWrongOldPassword(true);
            }

            if (res.data.message === "Email not available") {
                // user's new chosen email isn't available, show errro msg
                return setEmailAvailable(false);
            }

            // User successfully updated

            // add missing fields to updatedUser
            updatedUser.id = userId;
            updatedUser.registered_at = user.registered_at;

            // replace user's data in localStorage with new ones
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(updatedUser))

            // refresh page to update data on screen
            window.location.reload();
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Form onSubmit={checkFormValidity}>
            <ImageFieldset>
                {!userImage ?
                    !user.profile_img_url ?
                        <>
                            <PreviewImage src={defaultUserImg} />

                            <ImageInputLabel htmlFor='userImage'>
                                Add profile image
                                <input type="file" name='userImage' id='userImage' onChange={handleImageInput} accept="image/png, image/jpeg" />
                            </ImageInputLabel>
                        </>
                        :
                        <>
                            {/* <PreviewImage src={user.profile_img_url} /> */}

                            {/* temp for testing */}
                            <PreviewImage src={tempImg} />
                            <Button primary width='140px' type='button' onClick={handleImageInput}>Remove image</Button>
                        </>
                    :
                    <>
                        <PreviewImage src={URL.createObjectURL(userImage)} />
                        <Button primary width='140px' type='button' onClick={handleImageInput}>Remove image</Button>
                    </>
                }
            </ImageFieldset>

            <InputLabels>
                <label htmlFor="full_name">Full Name</label>
                <ErrorMsg>{formValidity.full_name || errorMessages.full_name}</ErrorMsg>
            </InputLabels>
            <Input type="text" name="full_name" onChange={handleInput} onBlur={validateOnBlur} value={user.full_name} required />

            <InputLabels>
                <label htmlFor="bio">Bio</label>
            </InputLabels>
            <textarea rows='3' name="bio" placeholder='Tell us something about you!' onChange={handleInput} onBlur={validateOnBlur} value={user.bio}></textarea>

            <InputLabels><label htmlFor="dob">Date of birth</label></InputLabels>
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
                        <label htmlFor="oldPassword">Old password</label>
                        <ErrorMsg>{wrongOldPassword && errorMessages.oldPassword}</ErrorMsg>
                    </InputLabels>
                    <Input type={inputType} name="oldPassword" onChange={handleInput} value={user.oldPassword} autoComplete="off" required />

                    <InputLabels>
                        <label htmlFor="passwordConfirm">New password</label>
                        <ErrorMsg>{formValidity.passwordConfirm || errorMessages.password}</ErrorMsg>
                    </InputLabels>
                    <Input type={inputType} name="passwordConfirm" onChange={handleInput} onBlur={validateOnBlur} value={user.passwordConfirm} autoComplete="off" required />

                    <InputLabels>
                        <label htmlFor="newPassword">Confirm new password</label>
                        <ErrorMsg>{formValidity.passwordEquality || errorMessages.passwordEquality}</ErrorMsg>
                    </InputLabels>
                    <Input type={inputType} name="newPassword" onChange={handleInput} onBlur={validateOnBlur} value={user.newPassword} autoComplete="off" required />

                    <PasswordVisibilityCheckbox>
                        <input type="checkbox" name="showPassword" onClick={togglePasswordVisibility} />
                        <label htmlFor="showPassword">Show password</label>
                    </PasswordVisibilityCheckbox>

                    <Button primaryOutlined width='220px' onClick={cancelPasswordEdit}>Cancel password change</Button>
                </>
                :
                <Button primaryOutlined width='220px' onClick={() => setPasswordEditMode(true)}>Change your password</Button>
            }
            <Button primary width='220px' type="submit">Confirm</Button>
        </Form>
    )
}

export default UserProfileEdit
