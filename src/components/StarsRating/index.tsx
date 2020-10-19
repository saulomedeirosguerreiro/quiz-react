import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import { IState } from '../../store';
import QuizController from '../../controllers/QuizController';

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
      <FaStar color="#b0b0b0" />
    </>
  ),

  easy: (
    <>
      <FaStar color="#353c58" />
      <FaStar color="#b0b0b0" />
      <FaStar color="#b0b0b0" />
    </>
  ),
};

const StarsRating: React.FC<StarsRatingProps> = ({ categoryId }) => {
  const level = useSelector<IState, 'hard' | 'easy' | 'medium'>((state) => {
    const categoryFound = state.quiz.categories.find(
      (item) => item.id === categoryId,
    );

    if (categoryFound && categoryFound.lastLevel)
      return categoryFound.lastLevel;
    return QuizController.INITIAL_LEVEL;
  });

  return (
    <Container>
      {stars[level]}
      <span>{level}</span>
    </Container>
  );
};

export default StarsRating;
