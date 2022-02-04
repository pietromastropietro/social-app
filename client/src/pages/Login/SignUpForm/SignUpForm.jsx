import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button/Button'
import Input from 'components/Input'
import axios from 'axios';
import { useState } from 'react'
import { regex } from 'utils/constants/regex';
import { errorMessages } from 'utils/constants/errorMessages'
import { getMaxDob } from 'utils/dateUtil';

const Form = styled.form`
    display: flex;
    flex-direction: column;

    > textarea {
        background-color: #eef0f5;
        border-radius: 20px;
        padding: 10px;
    }

    > button {
        margin-top: 20px;
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
const SignUpForm = ({ setLogin }) => {
    const [user, setUser] = useState({
        full_name: '',
        dob: '',
        email: '',
        password: ''
    });

    // state to check form fields validity and show error messages
    const [formValidity, setFormValidity] = useState({
        full_name: true,
        email: true,
        password: true,
    });

    // state to check email availability
    const [emailAvailable, setEmailAvailable] = useState(true);

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
            const res = await axios.post('http://localhost:4000/api/register', user);

            if (res.data.message === "User already exists. Please login") {
                // show message for unavailable email
                setEmailAvailable(false);
            } else {
                // user created, go back to login

                // temp
                alert(res.data.message);

                setLogin(true);
            }
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Form onSubmit={checkFormValidity}>
            <InputLabels>
                <label htmlFor="full_name">Full Name *</label>
                <ErrorMsg>{formValidity.full_name || errorMessages.full_name}</ErrorMsg>
            </InputLabels>
            <Input type="text" name="full_name" onChange={handleInput} onBlur={validateOnBlur} value={user.full_name} required />

            {/* <Label htmlFor="first_name">First Name *</Label>
                <Input type="text" name="first_name" onChange={handleInput} value={user.first_name} /> */}

            {/* <Label htmlFor="last_name">Last Name *</Label>
                <Input type="text" name="last_name" onChange={handleInput} value={user.last_name} /> */}

            {/* <Label htmlFor="username">Username *</Label>
                <Input type="text" name="username" onChange={handleInput} value={user.username} /> */}

            {/* <Label htmlFor="bio">Bio</Label>
                <textarea rows='3' name="bio" placeholder='Tell us something about you!' onChange={handleInput} value={user.bio}></textarea> */}

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

            <Button type="submit">Register</Button>
        </Form>
    )
}

export default SignUpForm
