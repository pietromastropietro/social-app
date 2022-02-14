import React from 'react'
import styled, { css } from "styled-components";
import { color } from 'style'

const Button = styled.button`
    font-family: inherit;
    font-weight: 600;
    width: ${ props => props.width || '100%' };
    min-width: ${ props => props.width || 'unset' };
    padding: 10px;
    border: 2px solid;
    border-radius: 10px;
    cursor: pointer;
    transition: .2s;

    ${props => props.small && css`
        padding: 6px;
    `}

    ${props => props.primary && css`
        background-color: #23b7f1;
        border-color: #23b7f1;
        color: white;
        
        &:hover {
            background-color: #1d99ca;
            border-color: #1d99ca;
        }
    `}

    ${props => props.primaryOutlined && css`
        background-color: white;
        border-color: #23b7f1;
        color: #23b7f1;
        
        &:hover {
            background-color: #23b7f1;
            color: white;
        }
    `}

    ${props => props.secondary && css`
        background-color: white;
        border-color: black;
        color: black;

        &:hover {
            background-color: #e6e6e6;
        }
    `}

    ${props => props.warning && css`
        background-color: #ff5454;
        border-color: #ff5454;
        color: white;

        &:hover {
            background-color: #c94040;
            border-color: #c94040;
        }
    `}

    ${props => props.warningOutlined && css`
        background-color: white;
        border-color: #ff5454;
        color: #ff5454;

        &:hover {
            background-color: #ff5454;
            color: white;
        }
    `}

    ${props => props.submitPrimary && css`
        border-radius: 20px;
        padding: 0;
    `}
`
export default Button