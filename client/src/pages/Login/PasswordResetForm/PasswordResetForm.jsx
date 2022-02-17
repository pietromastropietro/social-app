import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Input from 'components/Input'
import { useState } from 'react'
import axios from 'axios'
import { errorMessages } from 'utils/constants/errorMessages'
import { regex } from 'utils/constants/regex'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;

    > button {
        margin-top: 10px;
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
    align-self: center;
    font-size: 14px;
    font-weight: 600;
    height: 14px;
`
const PasswordVisibilityCheckbox = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 5px 0 15px 0;
`
const BtnFieldset = styled.fieldset`
    display: flex;
    column-gap: 10px;
`

const PasswordResetForm = ({ setPasswordResetMode }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    });

    // state to check form fields validity and show error messages
    const [formValidity, setFormValidity] = useState({
        email: true,
        password: true,
        passwordConfirm: true,
        passwordEquality: true
    });

    // state to check email existence
    const [emailExistence, setEmailExistence] = useState(true);

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

        setFormValidity({
            // reset field validity to hide error message
            ...formValidity,
            [name]: true
        })
        
        // remove error msg about email existence
        if (!emailExistence) {
            setEmailExistence(true);
        }
    };

    // validate fields when user leaves an input field
    const validateOnBlur = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "email": {
                setFormValidity({
                    ...formValidity,
                    email: regex.email.test(value),
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
    };

    const checkFormValidity = (e) => {
        e.preventDefault();

        if (Object.values(formValidity).every(value => value)) {
            handlePasswordReset();
        }
    };

    const handlePasswordReset = async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/reset-password`, {
                email: user.email,
                password: user.password
            })

            if (res.data.message == "Password changed") {
                // Go back to login page
                setPasswordResetMode(false);
            } else {
                // User not found, retry
                setEmailExistence(false);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <Form onSubmit={checkFormValidity}>

                <InputLabels>
                    <label htmlFor="email">Email *</label>
                    <ErrorMsg>
                        {formValidity.email || errorMessages.email}
                        {emailExistence || errorMessages.emailExistence}
                    </ErrorMsg>
                </InputLabels>
                <Input type="email" name="email" onChange={handleInput} onBlur={validateOnBlur} value={user.email} required />

                <InputLabels>
                    <label htmlFor="passwordConfirm">New password</label>
                    <ErrorMsg>{formValidity.passwordConfirm || errorMessages.password}</ErrorMsg>
                </InputLabels>
                <Input type={inputType} name="passwordConfirm" onChange={handleInput} onBlur={validateOnBlur} value={user.passwordConfirm} autoComplete="off" required />

                <InputLabels><label htmlFor="password">Confirm password</label></InputLabels>
                <Input type={inputType} name="password" onChange={handleInput} onBlur={validateOnBlur} value={user.password} autoComplete="off" required />

                <PasswordVisibilityCheckbox>
                    <input type="checkbox" name="showPassword" onClick={togglePasswordVisibility} />
                    <label htmlFor="showPassword">Show password</label>
                </PasswordVisibilityCheckbox>

                <ErrorMsg>{formValidity.passwordEquality || errorMessages.passwordEquality}</ErrorMsg>

                <BtnFieldset>
                    <Button primaryOutlined onClick={() => setPasswordResetMode(false)}>{`< Go back`}</Button>
                    <Button primary type="submit">Change password</Button>
                </BtnFieldset>
            </Form>
        </>
    )
}

export default PasswordResetForm
