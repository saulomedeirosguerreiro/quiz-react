import { Reducer } from 'redux';
import produce from 'immer';
import { IQuizState } from './types';

const INITIAL_STATE: IQuizState = {
  categories: [],
};

const quiz: Reducer<IQuizState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'ADD_CATEGORY_TO_QUIZ': {
        const { category } = action.payload;

        const categoryIndex = draft.categories.findIndex(
          (item) => item.id === category.id,
        );
        if (categoryIndex < 0)
          draft.categories.push({
            ...category,
            questions: [],
            hits: 0,
            miss: 0,
          });

        return draft;
      }
      case 'ADD_QUESTION_TO_QUIZ': {
        const { question, categoryId } = action.payload;
        const categoryIndex = draft.categories.findIndex(
          (category) => category.id === categoryId,
        );

        if (categoryIndex >= 0) {
          const category = draft.categories[categoryIndex];
          if (category.questions.length < 10) {
            category.questions.push(question) && question.isHit
              ? (category.hits += 1)
              : (category.miss += 1);
          }
        }

        return draft;
      }
      case 'UPDATE_LASTLEVEL_OF_CATEGORY': {
        const { category } = action.payload;

        const categoryIndex = draft.categories.findIndex(
          (item) => item.id === category.id,
        );

        if (categoryIndex >= 0) {
          const categoryFound = draft.categories[categoryIndex];
          categoryFound.lastLevel = category.lastLevel;
        }

        return draft;
      }
      default: {
        return draft;
      }
    }
  });
};

export default quiz;
