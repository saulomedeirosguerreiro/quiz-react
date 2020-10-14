import React from 'react';
import Header from '../../components/Header';
import { Container,Categories,Title } from './styles';
import {Link} from 'react-router-dom';
const Home: React.FC = () => {
  return (
    <Container>
        <Header title="Dev Mobile"/>
        <Title>
            <h4>Categorias</h4>
        </Title>
        <Categories>
            <Link to="/história/question">História</Link>
            <Link to="/geografia/question">Geografia</Link>
            <Link to="/mitologia/question">Mitologia</Link>
            <Link to="/esportes/question">Esportes</Link>
            <Link to="/política/question">Política</Link>
            <Link to="/conhecimentos%20gerais/question"> Conhecimentos gerais</Link>
        </Categories>
    </Container>
  );
}

export default Home;
