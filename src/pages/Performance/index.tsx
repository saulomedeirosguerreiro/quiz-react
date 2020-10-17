import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import {
  Container,
  Content,
  Avatar,
  OverallResult,
  ResultByLevel,
  Level,
  Footer,
} from './styles';

import avatar from '../../assets/avatar.svg';
import { IState } from '../../store';
import { ICategory } from '../../store/modules/quiz/types';

interface PerformanceParams {
  categoryId: string;
}

const Performance: React.FC = () => {
  const { categoryId } = useParams<PerformanceParams>();
  const currentCategory = useSelector<IState, ICategory | undefined>(
    (state) => {
      return state.quiz.categories.find(
        (category) => category.id === Number(categoryId),
      );
    },
  );

  const hitsEasy = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter(
      (question) => question.isHit === true && question.difficulty === 'easy',
    ).length;
  }, [currentCategory]);

  const missEasy = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter(
      (question) => question.isHit === false && question.difficulty === 'easy',
    ).length;
  }, [currentCategory]);

  const hitsMedium = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter(
      (question) => question.isHit === true && question.difficulty === 'medium',
    ).length;
  }, [currentCategory]);

  const missMedium = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter(
      (question) =>
        question.isHit === false && question.difficulty === 'medium',
    ).length;
  }, [currentCategory]);

  const hitsHard = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter(
      (question) => question.isHit === true && question.difficulty === 'hard',
    ).length;
  }, [currentCategory]);

  const missHard = useMemo(() => {
    if (!currentCategory) return 0;
    return currentCategory.questions.filter(
      (question) => question.isHit === false && question.difficulty === 'hard',
    ).length;
  }, [currentCategory]);

  return (
    <Container>
      <Header title={currentCategory?.name} />
      <Content>
        <Avatar>
          <img src={avatar} alt="avatar" />
          <div>
            <strong>Congratulations !</strong>
            <span>You have finished the test.</span>
          </div>
        </Avatar>
        <OverallResult>
          <div>
            <strong>{currentCategory?.hits || 0}</strong>
            <span>hits</span>
          </div>
          <div>
            <strong>{currentCategory?.miss || 0}</strong>
            <span>misses</span>
          </div>
        </OverallResult>
        <ResultByLevel>
          <Level>
            <strong>Easy</strong>
            <span>
              Hits:
              {hitsEasy}
            </span>
            <span>
              Misses:
              {missEasy}
            </span>
          </Level>
          <Level>
            <strong>Medium</strong>
            <span>
              Hits:
              {hitsMedium}
            </span>
            <span>
              Misses:
              {missMedium}
            </span>
          </Level>
          <Level>
            <strong>Hard</strong>
            <span>
              Hits:
              {hitsHard}
            </span>
            <span>
              Misses:
              {missHard}
            </span>
          </Level>
        </ResultByLevel>
      </Content>
      <Footer>
        <Link to="/">Back to start</Link>
      </Footer>
    </Container>
  );
};

export default Performance;
