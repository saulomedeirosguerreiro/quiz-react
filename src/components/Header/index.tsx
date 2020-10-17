import React from 'react';
import { Container } from './styles';

interface HeaderProps {
  title: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Container>
    <h3>{title}</h3>
  </Container>
);

export default Header;
