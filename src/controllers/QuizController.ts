import api from '../services/api';
import { IQuestionAPI } from '../services/types';
import { IAction, IQuestion } from '../store/modules/quiz/types';
import { updateLastLevelOfCategory } from '../store/modules/quiz/actions';

class QuizController {
  private static attrQuestion = {} as IQuestionAPI;

  private static readonly attrMaxNumberOfQuestions = 10;

  private static readonly attrInitialLevel = 'medium';

  static get question(): IQuestionAPI {
    return QuizController.attrQuestion;
  }

  static set question(question: IQuestionAPI) {
    QuizController.attrQuestion = question;
  }

  static get MAX_NUMBER_QUESTIONS(): number {
    return this.attrMaxNumberOfQuestions;
  }

  static get INITIAL_LEVEL(): 'hard' | 'medium' | 'easy' {
    return this.attrInitialLevel;
  }

  static async nextQuestion(
    categoryId: number,
    level: 'hard' | 'medium' | 'easy',
  ): Promise<IQuestionAPI> {
    const response = await api.get('/api.php', {
      params: {
        amount: 1,
        category: categoryId,
        difficulty: level || 'medium',
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
    } = results[0] as Omit<IQuestionAPI, 'answers'>;
    const answers = [...incorrect_answers, correct_answer];

    QuizController.question = {
      category,
      difficulty,
      question,
      incorrect_answers,
      correct_answer,
      answers,
    };

    return QuizController.question;
  }

  static isHit(chosenAnswer: string): boolean {
    return chosenAnswer === QuizController.question.correct_answer;
  }

  static getUpdateLastLevelAction(
    questions: Array<IQuestion>,
    categoryId: number,
  ): IAction | null {
    if (questions.length < 2) return null;

    const lastQuestion = questions[questions.length - 1];
    const penultQuestion = questions[questions.length - 2];

    const isTwoConsecutiveHits = lastQuestion.isHit && penultQuestion.isHit;
    const isTwoConsecutiveMisses = !lastQuestion.isHit && !penultQuestion.isHit;
    const isSameDifficulty =
      lastQuestion.difficulty === penultQuestion.difficulty;

    if (isTwoConsecutiveHits && isSameDifficulty) {
      if (lastQuestion.difficulty === 'medium')
        return updateLastLevelOfCategory({ id: categoryId, lastLevel: 'hard' });
      if (lastQuestion.difficulty === 'easy')
        return updateLastLevelOfCategory({
          id: categoryId,
          lastLevel: 'medium',
        });
    } else if (isTwoConsecutiveMisses && isSameDifficulty) {
      if (lastQuestion.difficulty === 'medium')
        return updateLastLevelOfCategory({ id: categoryId, lastLevel: 'easy' });
      if (lastQuestion.difficulty === 'hard')
        return updateLastLevelOfCategory({
          id: categoryId,
          lastLevel: 'medium',
        });
    }

    return null;
  }
}

export default QuizController;
