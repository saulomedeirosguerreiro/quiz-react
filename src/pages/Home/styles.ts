import styled from 'styled-components';
import {shade} from 'polished';
export const Container = styled.div`

`;

export const Title = styled.div`
    color: #353c58;
    margin: 1em 15em 1em 1em;
    text-align: center;
`;

export const Categories = styled.ul`
    height: 70vh;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar{
        display: none;
    }

    a{
        width: 300px;
        padding: 10px;
        border-radius: 10px;
        text-decoration:none;
        border:1px solid #d3d3d3;
        box-shadow:  2px 2px  #d3d3d3;
        color: #444F70;
        background: #f3f3f3;
        opacity:0.7;
        text-align:center;

        & + a {
            margin-top: 15px;
        }

        &:hover{
         background-color: ${shade(0.1,'#f3f3f3' )};
        }
    }
`;


