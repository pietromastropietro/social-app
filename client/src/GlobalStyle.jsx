import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Lato', sans-serif;
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
    }
`
export default GlobalStyle