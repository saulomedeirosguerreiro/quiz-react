import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from './styles';

import { updateLastLevelOfCategory } from '../../store/modules/quiz/actions';
import { IState } from '../../store';
import { ICategory } from '../../store/modules/quiz/types';

interface StarsRatingProps {
  categoryId: number;
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
  const category = useSelector<IState, ICategory | undefined>((state) => {
    return state.quiz.categories.find((item) => item.id === categoryId);
  });

  const level = useSelector<IState, 'hard' | 'easy' | 'medium'>((state) => {
    const categoryFound = state.quiz.categories.find(
      (item) => item.id === Number(categoryId),
    );
    if (categoryFound && categoryFound.lastLevel)
      return categoryFound.lastLevel;
    return 'medium';
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!category) {
      dispatch(
        updateLastLevelOfCategory({ id: categoryId, lastLevel: 'medium' }),
      );
      return;
    }

    const questionsLenght = category.questions.length;
    if (questionsLenght < 2) {
      dispatch(
        updateLastLevelOfCategory({ id: categoryId, lastLevel: 'medium' }),
      );
      return;
    }

    const lastQuestion = category.questions[questionsLenght - 1];
    const penultQuestion = category.questions[questionsLenght - 2];

    if (
      lastQuestion.isHit &&
      penultQuestion.isHit &&
      lastQuestion.difficulty === penultQuestion.difficulty
    ) {
      if (lastQuestion.difficulty === 'medium') {
        dispatch(
          updateLastLevelOfCategory({ id: categoryId, lastLevel: 'hard' }),
        );
        return;
      }
      if (lastQuestion.difficulty === 'easy') {
        dispatch(
          updateLastLevelOfCategory({ id: categoryId, lastLevel: 'medium' }),
        );
        return;
      }
    } else if (
      !lastQuestion.isHit &&
      !penultQuestion.isHit &&
      lastQuestion.difficulty === penultQuestion.difficulty
    ) {
      if (lastQuestion.difficulty === 'medium') {
        dispatch(
          updateLastLevelOfCategory({ id: categoryId, lastLevel: 'easy' }),
        );
        return;
      }
      if (lastQuestion.difficulty === 'hard') {
        dispatch(
          updateLastLevelOfCategory({ id: categoryId, lastLevel: 'medium' }),
        );
        return;
      }
    }

    dispatch(
      updateLastLevelOfCategory({
        id: categoryId,
        lastLevel: lastQuestion.difficulty,
      }),
    );
  }, [category, categoryId, dispatch]);

  return (
    <Container>
      {stars[level]}
      <span>{level}</span>
    </Container>
  );
};

export default StarsRating;
