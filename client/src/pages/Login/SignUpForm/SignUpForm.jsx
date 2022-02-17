import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Input from 'components/Input'
import axios from 'axios';
import { useState } from 'react'
import { regex } from 'utils/constants/regex';
import { errorMessages } from 'utils/constants/errorMessages'
import { getMaxDob } from 'utils/dateUtil';
import defaultUserImg from 'static/images/user.svg'
import logoImg from 'static/images/logo.png'
import { breakpoint } from 'style';
import Overlay from 'components/Overlay/Overlay';

const Logo = styled.img`
    margin-bottom: 20px;
    width: 300px;

    @media (max-width: ${breakpoint.primary}) {
        width: 100%;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;

    > textarea {
        background-color: #eef0f5;
        border-radius: 20px;
        padding: 10px;
    }

    > button {
        margin-top: 20px;
    }
`
const ImageFieldset = styled.div`
    display: flex;
    align-items: center;
    column-gap: 20px;
`
const PreviewImage = styled.img`
    width: 90px;
    height: 90px;
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
    border-radius: 10px;
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
const BtnFieldset = styled.fieldset`
    display: flex;
    column-gap: 10px;
    margin-top: 15px;
`
const Dialog = styled.div`
    background-color: #fff;
    width: 180px;
    border-radius: 20px;
    padding: 20px;
    text-align: center;

    > p {
        margin-bottom: 30px;
        font-size: 18px;
        font-weight: 600;
    }
`

const SignUpForm = ({ setLogin }) => {
    const [user, setUser] = useState({
        full_name: '',
        dob: '',
        profile_img_url: '',
        email: '',
        password: ''
    });

    const [userImage, setUserImage] = useState();

    // state to check form fields validity and show error messages
    const [formValidity, setFormValidity] = useState({
        full_name: true,
        email: true,
        password: true,
    });

    // state to check email availability
    const [emailAvailable, setEmailAvailable] = useState(true);

    // state to show user creation confirm dialog
    const [confirmDialog, setConfirmDialog] = useState(false);

    // state and function to toggle password visibility
    const [inputType, setInputType] = useState("password");

    const togglePasswordVisibility = () => {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
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

    // handle user profile image input
    const handleImageInput = (e) => {
        if (userImage) {
            // remove image previously uploaded by user
            setUserImage(undefined);
        } else {
            // add new profile image
            setUserImage(e.target.files[0]);
        }
    };

    // validate fields when user leaves an input field
    const validateOnBlur = (e) => {
        const { name, value } = e.target;

        setFormValidity({
            ...formValidity,
            [name]: regex[name].test(value)
        });

        // reset email availability to hide error message
        if (!emailAvailable) {
            setEmailAvailable(true);
        }
    };

    const checkFormValidity = (e) => {
        e.preventDefault();

        if (Object.values(formValidity).every(value => value) && emailAvailable) {
            signUpUser();
        }
    };

    const signUpUser = async () => {
        try {
            if (userImage) {
                // User chose a profile image, upload it and save its url

                // Upload profile image to AWS S3 bucket and get its url
                // const imgUrl = await handleImageUpload(userImage);

                // temp for testing
                const imgUrl = ''

                if (!imgUrl) {
                    return alert("Problems uploading image"); // temp
                } else {
                    setUser({ ...user, profile_img_url: imgUrl })
                }
            }

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, user);

            if (res.data.message === "User already exists. Please login") {
                // show message for unavailable email
                setEmailAvailable(false);
            } else {
                // user created, show confirm dialog
                setConfirmDialog(true)
            }
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
            <Logo src={logoImg} alt="website logo" />

            <Form onSubmit={checkFormValidity}>
                <ImageFieldset>
                    {!userImage ?
                        <>
                            <PreviewImage src={defaultUserImg} />

                            <ImageInputLabel htmlFor='userImage'>
                                Add profile image
                                <input type="file" name='userImage' id='userImage' onChange={handleImageInput} accept="image/png, image/jpeg" />
                            </ImageInputLabel>
                        </>
                        :
                        <>
                            <PreviewImage src={URL.createObjectURL(userImage)} />
                            <Button primary width='140px' type='button' onClick={handleImageInput}>Remove image</Button>
                        </>
                    }
                </ImageFieldset>

                <InputLabels>
                    <label htmlFor="full_name">Full Name *</label>
                    <ErrorMsg>{formValidity.full_name || errorMessages.full_name}</ErrorMsg>
                </InputLabels>
                <Input type="text" name="full_name" onChange={handleInput} onBlur={validateOnBlur} value={user.full_name} required />

                <InputLabels>
                    <label htmlFor="dob">Date of birth *</label>
                </InputLabels>
                <Input type="date" name="dob" max={getMaxDob()} onChange={handleInput} value={user.dob} required />

                <InputLabels>
                    <label htmlFor="email">Email *</label>

                    <ErrorMsg>
                        {formValidity.email || errorMessages.email}
                        {emailAvailable || errorMessages.emailAvailable}
                    </ErrorMsg>
                </InputLabels>
                <Input type="email" name="email" onChange={handleInput} onBlur={validateOnBlur} value={user.email} required />

                <InputLabels>
                    <label htmlFor="password">Password *</label>
                    <ErrorMsg>{formValidity.password || errorMessages.password}</ErrorMsg>
                </InputLabels>
                <Input type={inputType} name="password" onChange={handleInput} onBlur={validateOnBlur} value={user.password} autoComplete="off" required />

                <PasswordVisibilityCheckbox>
                    <input type="checkbox" name="showPassword" onClick={togglePasswordVisibility} />
                    <label htmlFor="showPassword">Show password</label>
                </PasswordVisibilityCheckbox>

                <BtnFieldset>
                    <Button primaryOutlined onClick={() => setLogin(true)}>{`< Go back`}</Button>
                    <Button primary type="submit">Register</Button>
                </BtnFieldset>
            </Form>

            {confirmDialog ?
                <Overlay>
                    <Dialog>
                        <p>New user created!</p>
                        <Button primary onClick={() => setLogin(true)}>Go to Login</Button>
                    </Dialog>
                </Overlay>
                : undefined
            }
        </>
    )
}

export default SignUpForm
