import styled from 'styled-components';
import {shade} from 'polished';


export const Container = styled.div`

`;

export const Content = styled.div`
     display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
`;

export const QuestionHeader = styled.div`
    width:65vw;
    max-width: 930px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin: 1em 0;
    text-align: center;
`;

export const Question = styled.p`
     width:65vw;
     max-width: 930px;
     text-align: justify;
     margin: 1em;
`;


export const ResponseOptions = styled.ul`

    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;

`;

export const Response = styled.button`
        width: 65vw;
        max-width: 930px;
        padding: 10px;
        border-radius: 10px;
        text-decoration:none;
        border:2px solid #d3d3d3;
        color: #000;
        background-color: #fff;
        text-align: justify;

        & + button {
            margin-top: 15px;
        }

        &:focus{
            border:2px solid #4d8af0;
        }


        &:hover{
         background-color: ${shade(0.1,'#fff' )};
        }
`;

export const Footer = styled.footer`
    width: 100vw;
    height: 3.5rem;
    display:flex;
    align-items:center;
    justify-content:center;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    box-shadow:  0px 0px 10px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;

    a{
        width: 65vw;
        max-width: 930px;
        background-color: #4d8af0;
        color: #fff;
        padding: 10px;
        border-radius: 10px;
        text-decoration:none;
        border:1px solid #d3d3d3;
        text-align:center;


        &:hover{
         background: ${shade(0.1,'#4d8af0' )};
        }

        svg{
            vertical-align: middle;
            display: inline-block;
            margin-left: 10px;
        }

        vertical-align: middle;
        display: inline-block;


    }

    button{
        width: 65vw;
        max-width: 930px;
        background-color: #4d8af0;
        color: #fff;
        padding: 10px;
        border-radius: 10px;
        text-decoration:none;
        border:1px solid #d3d3d3;
        text-align:center;


        &:hover{
         background: ${shade(0.1,'#4d8af0' )};
        }

    }

`;
