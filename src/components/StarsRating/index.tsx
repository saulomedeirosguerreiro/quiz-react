import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';
import { IState } from '../../store';
import { IQuestion } from '../../store/modules/quiz/types';
import QuizController from '../../controllers/QuizController';

interface StarsRatingProps {
  categoryId: number;
}

interface StateRedux {
  level: 'hard' | 'easy' | 'medium';
  questions: Array<IQuestion>;
}

const stars = {
  hard: (
    <>
      <FaStar color="#353c58" />
      <FaStar color="#353c58" />
      <FaStar color="#353c58" />
    </>
  ),
  medium: (
    <>
      <FaStar color="#353c58" />
      <FaStar color="#353c58" />
      <FaStar color="#d3d3d3" />
    </>
  ),

  easy: (
    <>
      <FaStar color="#353c58" />
      <FaStar color="#d3d3d3" />
      <FaStar color="#d3d3d3" />
    </>
  ),
};

const StarsRating: React.FC<StarsRatingProps> = ({ categoryId }) => {
  const { level, questions } = useSelector<IState, StateRedux>((state) => {
    const categoryFound = state.quiz.categories.find(
      (item) => item.id === categoryId,
    );

    const stateRedux = {} as StateRedux;
    if (categoryFound) {
      stateRedux.questions = categoryFound.questions;
      stateRedux.level = categoryFound.lastLevel
        ? categoryFound.lastLevel
        : QuizController.INITIAL_LEVEL;
    } else {
      stateRedux.questions = [];
      stateRedux.level = QuizController.INITIAL_LEVEL;
    }

    return stateRedux;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const updateLastLevelAction = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );
    updateLastLevelAction && dispatch(updateLastLevelAction);
  }, [questions, categoryId, dispatch]);

  return (
    <Container>
      {stars[level]}
      <span>{level}</span>
    </Container>
  );
};

export default StarsRating;
