import React from 'react';

import { Container } from './styles';
import spinner from '../../assets/spinner.gif';

const Load: React.FC = () => {
  return (
    <Container>
      <img src={spinner} alt="loading" />
    </Container>
  );
};

export default Load;
