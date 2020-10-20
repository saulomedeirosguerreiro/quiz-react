import MockAdapter from 'axios-mock-adapter';
import QuizController from '../../controllers/QuizController';
import api from '../../services/api';
import { IAction, IQuestion } from '../../store/modules/quiz/types';

const apiMock = new MockAdapter(api);
describe('QuizController unit tests', () => {
  it('should be able to get next question and generate new array with all response options', async () => {
    const categoryId = 1;
    const level = 'medium';

    const results = [
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'medium',
        question: 'What number does the Roman numeral &quot;D&quot; stand for?',
        correct_answer: '500',
        incorrect_answers: ['100', '1000', '50'],
      },
    ];

    apiMock.onGet('/api.php').reply(200, {
      results,
    });

    const question = await QuizController.nextQuestion(categoryId, level);

    expect(question.answers).toEqual(
      expect.arrayContaining(['100', '500', '1000', '50']),
    );
  });

  it('should be able to chosen the right answer', () => {
    const chosenAnswer = '500';
    QuizController.question = {
      category: 'History',
      difficulty: 'medium',
      question: 'What number does the Roman numeral &quot;D&quot; stand for?',
      correct_answer: '500',
      incorrect_answers: ['100', '1000', '50'],
      answers: ['100', '1000', '50', '500'],
    };
    const result = QuizController.isHit(chosenAnswer);

    expect(result).toBeTruthy();
  });

  it('should be able to choose the wrong answer', () => {
    const chosenAnswer = '50';
    QuizController.question = {
      category: 'History',
      difficulty: 'medium',
      question: 'What number does the Roman numeral &quot;D&quot; stand for?',
      correct_answer: '500',
      incorrect_answers: ['100', '1000', '50'],
      answers: ['100', '1000', '50', '500'],
    };
    const result = QuizController.isHit(chosenAnswer);

    expect(result).toBeFalsy();
  });

  it('10 should be the maximum number of questions per category', () => {
    const maxNumberOfQuestionsPerCategory = 10;
    expect(QuizController.MAX_NUMBER_QUESTIONS).toEqual(
      maxNumberOfQuestionsPerCategory,
    );
  });

  it('medium should be the initial level', () => {
    const initialLevel = 'medium';
    expect(QuizController.INITIAL_LEVEL).toEqual(initialLevel);
  });

  it('should be the last level equal to hard due to two consecutive hits of the same medium level', () => {
    const questions: Array<IQuestion> = [];
    const categoryId = 1;

    questions.push({
      difficulty: 'medium',
      chosen_answer: '500',
      correct_answer: '500',
      isHit: true,
    });
    questions.push({
      difficulty: 'medium',
      chosen_answer: 'John',
      correct_answer: 'John',
      isHit: true,
    });

    const result: IAction | null = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );

    const { category } = result?.payload;

    expect(category.lastLevel).toEqual('hard');
  });

  it('should be the last level equal to medium due to two consecutive hits of the same easy level', () => {
    const questions: Array<IQuestion> = [];
    const categoryId = 1;

    questions.push({
      difficulty: 'easy',
      chosen_answer: '500',
      correct_answer: '500',
      isHit: true,
    });
    questions.push({
      difficulty: 'easy',
      chosen_answer: 'John',
      correct_answer: 'John',
      isHit: true,
    });

    const result: IAction | null = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );

    const { category } = result?.payload;

    expect(category.lastLevel).toEqual('medium');
  });

  it('should be the last level equal to medium due to two consecutive misses of the same hard level', () => {
    const questions: Array<IQuestion> = [];
    const categoryId = 1;

    questions.push({
      difficulty: 'hard',
      chosen_answer: '50',
      correct_answer: '500',
      isHit: false,
    });
    questions.push({
      difficulty: 'hard',
      chosen_answer: 'John',
      correct_answer: 'Maria',
      isHit: false,
    });

    const result: IAction | null = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );

    const { category } = result?.payload;

    expect(category.lastLevel).toEqual('medium');
  });

  it('should be the last level equal to easy due to two consecutive misses of the same medium level', () => {
    const questions: Array<IQuestion> = [];
    const categoryId = 1;

    questions.push({
      difficulty: 'medium',
      chosen_answer: '50',
      correct_answer: '500',
      isHit: false,
    });
    questions.push({
      difficulty: 'medium',
      chosen_answer: 'John',
      correct_answer: 'Maria',
      isHit: false,
    });

    const result: IAction | null = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );

    const { category } = result?.payload;

    expect(category.lastLevel).toEqual('easy');
  });

  it('should return null when the number of questions < 2', () => {
    const questions: Array<IQuestion> = [];
    const categoryId = 1;

    const result = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );

    expect(result).toBe(null);
  });

  it('should return null if  does not have two consecutive hits or misses on the same level', () => {
    const questions: Array<IQuestion> = [];
    const categoryId = 1;

    questions.push({
      difficulty: 'hard',
      chosen_answer: '50',
      correct_answer: '500',
      isHit: false,
    });
    questions.push({
      difficulty: 'medium',
      chosen_answer: 'John',
      correct_answer: 'Maria',
      isHit: false,
    });

    const result = QuizController.getUpdateLastLevelAction(
      questions,
      categoryId,
    );

    expect(result).toBe(null);
  });
});
