import React from 'react'
import styled, { css } from "styled-components";
import { color } from 'style'

const Button = styled.button`
    font-family: inherit;
    font-weight: 600;
    /* background-color: #23b7f1; */
    /* color: white; */
    width: ${ props => props.width || '100%' };
    /* width: 100%; */
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    border: 2px solid;
    transition: .2s;

    ${props => props.small && css`
        padding: 6px;
    `}

    /* ${props => props.width && css`
        padding: 6px;
    `} */

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
        border-color: ff5454;
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
`
export default Button



// const StyledButton = styled.button`
//     font-family: inherit;
//     background-color: #23b7f1;
//     color: white;
//     width: 100%;
//     border: none;
//     padding: 10px;
//     border-radius: 10px;
//     cursor: pointer;
//     border:1px solid #23b7f1;

//     ${props => props.theme === 'primary' ? css`
//         background-color: black !important;
//     `:undefined}
// `


// const Button = ({children}) => {

//     return (
//         <StyledButton>
//             {children}
//         </StyledButton>
//     )
// }
// export default Button