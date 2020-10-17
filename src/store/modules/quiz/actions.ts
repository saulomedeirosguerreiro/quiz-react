import { ICategory, IQuestion, IAction } from './types';

export function addCategoryToQuiz(
  category: Pick<ICategory, 'id' | 'name'>,
): IAction {
  return {
    type: 'ADD_CATEGORY_TO_QUIZ',
    payload: {
      category,
    },
  };
}

export function addQuestionToQuiz(
  question: IQuestion,
  categoryId: number,
): IAction {
  return {
    type: 'ADD_QUESTION_TO_QUIZ',
    payload: {
      question,
      categoryId,
    },
  };
}

export function updateLastLevelOfCategory(
  category: Pick<ICategory, 'id' | 'lastLevel'>,
): IAction {
  return {
    type: 'UPDATE_LASTLEVEL_OF_CATEGORY',
    payload: {
      category,
    },
  };
}
