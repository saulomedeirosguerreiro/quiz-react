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
import QuizController from '../../controllers/QuizController';
import {
  addCategoryToQuiz,
  addQuestionToQuiz,
} from '../../store/modules/quiz/actions';
import { IState } from '../../store';
import { IQuestionAPI } from '../../services/types';
import { IQuestion } from '../../store/modules/quiz/types';
import StarsRating from '../../components/StarsRating';

interface InquiryParams {
  categoryId: string;
  categoryName: string;
}

interface StateRedux {
  level: 'hard' | 'easy' | 'medium';
  questions: Array<IQuestion>;
}

const Inquiry: React.FC = () => {
  const [isFocused, setFocused] = useState(false);
  const [isQuestionAnswered, setQuestionAnswered] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast, removeAllToast } = useToast();

  const [currentQuestion, setCurrentQuestion] = useState<IQuestionAPI>(
    {} as IQuestionAPI,
  );
  const [chosenAnswer, setChosenAnswer] = useState('');

  const { categoryId, categoryName } = useParams<InquiryParams>();
  const categoryIdNumber = Number(categoryId);

  const { level, questions } = useSelector<IState, StateRedux>((state) => {
    const categoryFound = state.quiz.categories.find(
      (item) => item.id === categoryIdNumber,
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

  const numberOfQuestion = useMemo(() => questions.length + 1, [questions]);

  useEffect(() => {
    dispatch(
      addCategoryToQuiz({
        id: categoryIdNumber,
        name: categoryName,
      }),
    );
  }, [dispatch, categoryIdNumber, categoryName]);

  useEffect(() => {
    if (numberOfQuestion > QuizController.MAX_NUMBER_QUESTIONS) {
      history.push(`/${categoryIdNumber}/performance`);
      return;
    }

    async function loadQuestion(): Promise<void> {
      const loadedQuestion = await QuizController.nextQuestion(
        categoryIdNumber,
        level,
      );
      setCurrentQuestion(loadedQuestion);
    }

    loadQuestion();

    // eslint-disable-next-line consistent-return
    return () => {
      removeAllToast();
    };
  }, [removeAllToast, numberOfQuestion, history, level, categoryIdNumber]);

  const handleChoiceAnswer = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setFocused(true);
      setChosenAnswer(event.currentTarget.innerHTML);
    },
    [],
  );

  const handleAnswer = useCallback(() => {
    const isHit = QuizController.isHit(chosenAnswer);

    if (isHit) addToast({ title: 'You are right!', type: 'success' });
    else addToast({ title: 'You are wrong !', type: 'error' });

    setQuestionAnswered(true);
  }, [addToast, chosenAnswer]);

  const handleNextQuestion = useCallback(() => {
    const { difficulty, correct_answer } = QuizController.question;
    const isHit = QuizController.isHit(chosenAnswer);

    const updateLastLevelAction = QuizController.getUpdateLastLevelAction(
      [
        ...questions,
        {
          difficulty,
          chosen_answer: chosenAnswer,
          correct_answer,
          isHit,
        },
      ],
      categoryIdNumber,
    );
    updateLastLevelAction && dispatch(updateLastLevelAction);

    dispatch(
      addQuestionToQuiz(
        {
          difficulty,
          chosen_answer: chosenAnswer,
          correct_answer,
          isHit,
        },
        categoryIdNumber,
      ),
    );

    removeAllToast();
    setFocused(false);
    setQuestionAnswered(false);
  }, [removeAllToast, chosenAnswer, dispatch, categoryIdNumber, questions]);

  return (
    <Container>
      <Header title={currentQuestion.category} />
      <Content>
        <QuestionHeader>
          <strong>
            Question
            {` ${numberOfQuestion}`}
          </strong>
          <StarsRating categoryId={categoryIdNumber} />
        </QuestionHeader>

        <Question>{currentQuestion.question}</Question>
        <ResponseOptions>
          {currentQuestion.answers?.map((answer) => (
            <Response
              key={answer}
              onClick={(event: MouseEvent<HTMLButtonElement>) =>
                handleChoiceAnswer(event)
              }
            >
              {answer}
            </Response>
          ))}
        </ResponseOptions>
      </Content>
      {isFocused && (
        <Footer>
          {!isQuestionAnswered ? (
            <button type="button" onClick={handleAnswer}>
              Answer
            </button>
          ) : (
            <Link
              to={
                numberOfQuestion < QuizController.MAX_NUMBER_QUESTIONS
                  ? `/${categoryIdNumber}/${categoryName}/question`
                  : `/${categoryIdNumber}/performance`
              }
              onClick={handleNextQuestion}
            >
              {numberOfQuestion < QuizController.MAX_NUMBER_QUESTIONS
                ? 'Advance'
                : 'Finish'}
              {numberOfQuestion < QuizController.MAX_NUMBER_QUESTIONS && (
                <FaArrowRight />
              )}
            </Link>
          )}
        </Footer>
      )}
    </Container>
  );
};

export default Inquiry;
