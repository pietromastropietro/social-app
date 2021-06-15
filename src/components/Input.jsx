import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
    height: 10px;
    padding: 10px 20px;
    outline: none;
    border: none;
    border: 1px solid #d3d3d3;
    border-radius: 20px;
`;

const Input = ({ type, placeholder }) => {
    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
        />
    )
}

export default Input
