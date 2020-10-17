import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  MouseEvent,
} from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import {
  Container,
  Footer,
  QuestionHeader,
  ResponseOptions,
  Response,
  Content,
  Question,
} from './styles';

import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import {
  addCategoryToQuiz,
  addQuestionToQuiz,
} from '../../store/modules/quiz/actions';
import { IState } from '../../store';
import { ICategory } from '../../store/modules/quiz/types';
import StarsRating from '../../components/StarsRating';

interface InquiryParams {
  categoryId: string;
}

interface Question {
  category: string;
  difficulty: 'hard' | 'medium' | 'easy';
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  answers: Array<string>;
}

const Inquiry: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    {} as Question,
  );
  const [isFocused, setFocused] = useState(false);
  const [isQuestionAnswered, setQuestionAnswered] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState('');
  const { categoryId } = useParams<InquiryParams>();
  const currentCategory = useSelector<IState, ICategory | undefined>(
    (state) => {
      return state.quiz.categories.find(
        (category) => category.id === Number(categoryId),
      );
    },
  );

  const level = useSelector<IState, 'hard' | 'easy' | 'medium'>((state) => {
    const categoryFound = state.quiz.categories.find(
      (item) => item.id === Number(categoryId),
    );
    if (categoryFound && categoryFound.lastLevel)
      return categoryFound.lastLevel;
    return 'medium';
  });

  const history = useHistory();
  const { addToast, removeAllToast } = useToast();

  const dispatch = useDispatch();

  const numberOfQuestion = useMemo(() => {
    if (!currentCategory) return 1;
    return currentCategory.questions.length + 1;
  }, [currentCategory]);

  useEffect(() => {
    if (numberOfQuestion === 11) {
      history.push(`/${categoryId}/performance`);
      return;
    }

    async function loadQuestion(): Promise<void> {
      const response = await api.get('/api.php', {
        params: {
          amount: 1,
          category: categoryId,
          difficulty: level,
          type: 'multiple',
        },
      });

      const { results } = response.data;
      const {
        category,
        difficulty,
        question,
        incorrect_answers,
        correct_answer,
      } = results[0] as Omit<Question, 'answers'>;
      const answers = [...incorrect_answers, correct_answer];
      setCurrentQuestion({
        category,
        difficulty,
        question,
        incorrect_answers,
        correct_answer,
        answers,
      });
      dispatch(addCategoryToQuiz({ id: Number(categoryId), name: category }));
    }

    loadQuestion();

    // eslint-disable-next-line consistent-return
    return () => {
      removeAllToast();
    };
  }, [categoryId, removeAllToast, dispatch, numberOfQuestion, history, level]);

  const handleResponse = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setFocused(true);
    setChosenAnswer(event.currentTarget.innerHTML);
  }, []);

  const handleResponseAction = useCallback(() => {
    const isHit = chosenAnswer === currentQuestion.correct_answer;

    if (isHit) addToast({ title: 'You are right!', type: 'success' });
    else addToast({ title: 'You are wrong !', type: 'error' });

    setQuestionAnswered(true);
  }, [addToast, currentQuestion, chosenAnswer]);

  const handleNextQuestion = useCallback(() => {
    const isHit = chosenAnswer === currentQuestion.correct_answer;
    dispatch(
      addQuestionToQuiz(
        {
          difficulty: currentQuestion.difficulty,
          chosen_answer: chosenAnswer,
          correct_answer: currentQuestion.correct_answer,
          isHit,
        },
        Number(categoryId),
      ),
    );
    removeAllToast();
    setFocused(false);
    setQuestionAnswered(false);
  }, [removeAllToast, currentQuestion, chosenAnswer, dispatch, categoryId]);

  return (
    <Container>
      <Header title={currentQuestion.category} />
      <Content>
        <QuestionHeader>
          <strong>
            Question
            {` ${numberOfQuestion}`}
          </strong>
          <StarsRating categoryId={Number(categoryId)} />
        </QuestionHeader>

        <Question>{currentQuestion.question}</Question>
        <ResponseOptions>
          {currentQuestion.answers?.map((answer) => (
            <Response
              key={answer}
              onClick={(event: MouseEvent<HTMLButtonElement>) =>
                handleResponse(event)}
            >
              {answer}
            </Response>
          ))}
        </ResponseOptions>
      </Content>
      {isFocused && (
        <Footer>
          {!isQuestionAnswered ? (
            <button type="button" onClick={handleResponseAction}>
              Answer
            </button>
          ) : (
            <Link
              to={
                numberOfQuestion < 10
                  ? `/${categoryId}/question`
                  : `/${categoryId}/performance`
              }
              onClick={handleNextQuestion}
            >
              {numberOfQuestion < 10 ? 'Advance' : 'Finish'}
              {numberOfQuestion < 10 && <FaArrowRight />}
            </Link>
          )}
        </Footer>
      )}
    </Container>
  );
};

export default Inquiry;
