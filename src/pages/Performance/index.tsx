import React, {useMemo} from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import { Container, Content, Avatar,OverallResult, ResultByLevel, Level,Footer} from './styles';
import {Link} from 'react-router-dom';
import avatar from '../../assets/avatar.svg';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { ICategory } from '../../store/modules/quiz/types';

interface PerformanceParams{
    categoryId:string;
}


const Performance: React.FC = () => {

  const {categoryId} = useParams<PerformanceParams>();
  const currentCategory = useSelector<IState, ICategory | undefined>(state => {
    return state.quiz.categories.find(category => category.id === Number(categoryId));
  });

  const hitsEasy = useMemo(() => {
    if(!currentCategory) return 0;
    return currentCategory.questions.filter(question => question.isHit === true && question.difficulty === 'easy').length;
  },[currentCategory]);

  const missEasy = useMemo(() => {
    if(!currentCategory) return 0;
    return currentCategory.questions.filter(question => question.isHit === false && question.difficulty === 'easy').length;
  },[currentCategory]);

  const hitsMedium = useMemo(() => {
    if(!currentCategory) return 0;
    return currentCategory.questions.filter(question => question.isHit === true && question.difficulty === 'medium').length;
  },[currentCategory]);

  const missMedium = useMemo(() => {
    if(!currentCategory) return 0;
    return currentCategory.questions.filter(question => question.isHit === false && question.difficulty === 'medium').length;
  },[currentCategory]);


  const hitsHard = useMemo(() => {
    if(!currentCategory) return 0;
    return currentCategory.questions.filter(question => question.isHit === true && question.difficulty === 'hard').length;
  },[currentCategory]);

  const missHard = useMemo(() => {
    if(!currentCategory) return 0;
    return currentCategory.questions.filter(question => question.isHit === false && question.difficulty === 'hard').length;
  },[currentCategory]);


  return (
      <Container>
          <Header title={currentCategory?.name}/>
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
                        <strong>{currentCategory?.hits}</strong>
                        <span>acertos</span>
                  </div>
                  <div>
                        <strong>{currentCategory?.miss}</strong>
                        <span>erros</span>
                  </div>
              </OverallResult>
              <ResultByLevel>
                  <Level>
                        <strong>Fácil</strong>
                        <span>Acertos: {hitsEasy}</span>
                        <span>Erros: {missEasy}</span>
                  </Level>
                  <Level>
                        <strong>Médio</strong>
                        <span>Acertos: {hitsMedium}</span>
                        <span>Erros: {missMedium}</span>
                  </Level>
                  <Level>
                        <strong>Difícil</strong>
                        <span>Acertos: {hitsHard}</span>
                        <span>Erros: {missHard}</span>
                  </Level>
              </ResultByLevel>
          </Content>
          <Footer>
                <Link to="/" >
                Voltar ao início
                </Link>
            </Footer>
      </Container>
  );
}

export default Performance;
