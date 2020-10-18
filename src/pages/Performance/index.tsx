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
import { IQuestion } from '../../store/modules/quiz/types';

interface PerformanceParams {
  categoryId: string;
}

interface StateRedux {
  questions: Array<IQuestion>;
  name: string;
  hits: number;
  misses: number;
}

const Performance: React.FC = () => {
  const { categoryId } = useParams<PerformanceParams>();
  const { questions, name, hits, misses } = useSelector<IState, StateRedux>(
    (state) => {
      const categoryFound = state.quiz.categories.find(
        (item) => item.id === Number(categoryId),
      );

      const stateRedux = {} as StateRedux;

      if (categoryFound) {
        stateRedux.questions = categoryFound.questions;
        stateRedux.name = categoryFound.name;
        stateRedux.hits = categoryFound.hits;
        stateRedux.misses = categoryFound.miss;
      } else {
        stateRedux.questions = [];
        stateRedux.name = '';
        stateRedux.hits = 0;
        stateRedux.misses = 0;
      }

      return stateRedux;
    },
  );

  const hitsEasy = useMemo(() => {
    return questions.filter(
      (question) => question.isHit === true && question.difficulty === 'easy',
    ).length;
  }, [questions]);

  const missEasy = useMemo(() => {
    return questions.filter(
      (question) => question.isHit === false && question.difficulty === 'easy',
    ).length;
  }, [questions]);

  const hitsMedium = useMemo(() => {
    return questions.filter(
      (question) => question.isHit === true && question.difficulty === 'medium',
    ).length;
  }, [questions]);

  const missMedium = useMemo(() => {
    return questions.filter(
      (question) =>
        question.isHit === false && question.difficulty === 'medium',
    ).length;
  }, [questions]);

  const hitsHard = useMemo(() => {
    return questions.filter(
      (question) => question.isHit === true && question.difficulty === 'hard',
    ).length;
  }, [questions]);

  const missHard = useMemo(() => {
    return questions.filter(
      (question) => question.isHit === false && question.difficulty === 'hard',
    ).length;
  }, [questions]);

  return (
    <Container>
      <Header title={name} />
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
            <strong>{hits}</strong>
            <span>hits</span>
          </div>
          <div>
            <strong>{misses}</strong>
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
