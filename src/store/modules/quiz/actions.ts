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


export function updateLastLevelOfCategory(category: Pick<ICategory, 'id' | 'lastLevel'>){
    return {
        type: 'UPDATE_LASTLEVEL_OF_CATEGORY',
        payload: {
            category
        }
    }
}
