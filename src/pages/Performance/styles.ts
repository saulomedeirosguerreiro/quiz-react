import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background-color: #d3d3d3;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    display: block;
  }
`;

export const Avatar = styled.div`
  width: 60vw;
  display: flex;
  align-items: center;
  margin-top: 0.5em;

  img {
    width: 20vw;
  }
`;

export const OverallResult = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${shade(0.2, '#d3d3d3')};
  text-align: center;
`;

export const ResultByLevel = styled.div`
  flex: 0.5;
  width: 80vw;
  margin-top: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Level = styled.div`
  border-left: 1px solid #000;
  padding: 5px;
`;

export const Footer = styled.footer`
  width: 100vw;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;

  a {
    width: 55vw;
    max-width: 930px;
    background-color: #4d8af0;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    text-decoration: none;
    border: 1px solid #d3d3d3;
    text-align: center;

    &:hover {
      background: ${shade(0.1, '#4d8af0')};
    }
  }
`;
