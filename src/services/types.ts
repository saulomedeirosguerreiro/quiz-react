export interface IQuestionAPI {
  category: string;
  difficulty: 'hard' | 'medium' | 'easy';
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  answers: Array<string>;
}
