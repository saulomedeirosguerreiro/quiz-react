import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        outline:0;
    }

    body{
        -webkit-font-smoothing:antialiased;
    }

    box-sizing, -moz-user-input {
        font-family: 'Oswald', serif;
        font-size:16px;
    }

    h1,h2,h3,h4,h5,h6{
        font-weight: 500;
    }

    strong{
        color:#353c58;
    }

    button {
        cursor:pointer;
    }
`;
