import styled from 'styled-components';
import {shade} from 'polished';
export const Container = styled.div`
    background-color: #d3d3d3;
    height: 100vh;
`;


export const Content = styled.div`
    display:flex;
    height: 80vh;
    flex-direction:column;
    align-items:center;

    span{
      display:block;
    }

`;


export const  Avatar = styled.div`
       flex: 0.5;
       width: 60vw;
       display:flex;
       align-items:center;
       margin-top: 0.5em;
       img{
            width: 20vw;
       }
`;


export const  OverallResult = styled.div`
    flex: 0.25;
    width: 60vw;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    background-color: ${shade(0.2,'#d3d3d3')};
    text-align:center;

`;

export const  ResultByLevel = styled.div`
    flex: 0.5;
    width: 80vw;
    margin-top: 1em;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
`;

export const  Level = styled.div`
        border-left: 1px solid #000;
        padding: 5px;
`;
