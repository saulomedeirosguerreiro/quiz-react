import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { Container, Content, Avatar,OverallResult, ResultByLevel, Level} from './styles';

import avatar from '../../assets/avatar.svg';

const Performance: React.FC = () => {

  const {category} = useParams();

  return (
      <Container>
          <Header title={category}/>
          <Content>
              <Avatar>
                <img  src={avatar} alt="avatar"/>
                <div>
                    <strong>Parabéns !</strong>
                    <span>Você finalizou o teste.</span>

                </div>
              </Avatar>
              <OverallResult>
                  <div>
                        <strong>7</strong>
                        <span>acertos</span>
                  </div>
                  <div>
                        <strong>3</strong>
                        <span>erros</span>
                  </div>
              </OverallResult>
              <ResultByLevel>
                  <Level>
                        <strong>Fácil</strong>
                        <span>Acertos: 2</span>
                        <span>Erros: 1</span>
                  </Level>
                  <Level>
                        <strong>Médio</strong>
                        <span>Acertos: 3</span>
                        <span>Erros: 1</span>
                  </Level>
                  <Level>
                        <strong>Difícil</strong>
                        <span>Acertos: 2</span>
                        <span>Erros: 1</span>
                  </Level>
              </ResultByLevel>
          </Content>

      </Container>
  );
}

export default Performance;
