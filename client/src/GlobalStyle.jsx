import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Montserrat', sans-serif;
        /* font-family: 'Lato', sans-serif; */
        background-color: #eef0f5;
        margin: 0;
        padding: 0;
        border: 0;
    }
    #root {
        display: flex;
        flex-direction: column;
    }
    p {
        margin: 0;
        padding: 0;
        border: 0;
    }
    fieldset {
        border: none;
        margin: 0;
        padding: 0;
    }
    textarea {
        font-family: inherit;
        font-size: inherit;
        border: none;
        outline: none;
        resize: none;
    }
    button {
        border: none;
        outline: none;
    }
    ul {
        list-style-type: none;
        border: 0;
        margin: 0;
        padding: 0;
    }
    li {
        border: 0;
        margin: 0;
        padding: 0;
    }
    a {
        color: inherit;
    text-decoration: none;
    }
    input {
        outline: none;
        border: none;
    }

    /* SCROLLBAR */

// Firefox
* {
    scrollbar-width: thin;
    scrollbar-color: var(--secondary-text-color) transparent;
}

// Chrome, Edge, and Safari
::-webkit-scrollbar {
    width: 8px;
    height: 6px;
}
::-webkit-scrollbar-track {
    /* background: transparent; */
}
::-webkit-scrollbar-thumb {
    background-color: #8f8f8f;
    border-radius: 20px;

    &:hover {
        background-color: #424242;
    }
}
`
export default GlobalStyle