import {ICategory, IQuestion} from './types';

export function addCategoryToQuiz(category: Pick<ICategory, 'id' | 'name'>){
    return {
        type: 'ADD_CATEGORY_TO_QUIZ',
        payload: {
            category
        }
    }
}

export function addQuestionToQuiz(question: IQuestion, categoryId: number){
    return {
        type: 'ADD_QUESTION_TO_QUIZ',
        payload: {
            question,
            categoryId
        }
    }
}
