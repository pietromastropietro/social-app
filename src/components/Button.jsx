import React from 'react'
import styled from "styled-components";
import { color } from '../style'

const StyledButton = styled.button`
    background-color: #23b7f1;
    color: white;
    width: 70px;
    height: 30px;
    border: none;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
`;

const Button = ({ text }) => {
    return (
        <StyledButton>
            {text}
        </StyledButton>
    )
};
export default Button