import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        outline:0;
    }

    @media(max-width: 50em) {
      body{
        font-size: 2vw;
      }

      button {
        font-size: 1.8vw;
      }
    }

    @media screen and (min-width: 75em) {
      body {
        font-size: 1.5em;
      }

      button {
        font-size: 1.3em;
      }
    }

    body{
        -webkit-font-smoothing:antialiased;
        font-size: calc(0.8em + 1vw);
    }

    box-sizing, -moz-user-input {
        font-family: 'Oswald', serif;
    }


    h1,h2,h3,h4,h5,h6{
        font-weight: 500;
    }

    strong{
        color:#353c58;
    }

    button {
        cursor:pointer;
        font-size: calc(0.6em + 1vw);
    }
`;
