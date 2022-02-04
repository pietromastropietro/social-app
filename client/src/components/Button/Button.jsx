import React from 'react'
import styled, { css } from "styled-components";
import { color } from 'style'

const Button = styled.button`
    font-family: inherit;
    background-color: #23b7f1;
    color: white;
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    border:1px solid #23b7f1;

    ${props => props.primary && css`
        background-color: black !important;
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