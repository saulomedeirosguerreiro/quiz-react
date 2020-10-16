import { Reducer } from "redux";
import {IQuizState} from './types';
import produce from 'immer';


const INITIAL_STATE:IQuizState = {
    categories:[]
};

const quiz: Reducer<IQuizState> = (state = INITIAL_STATE, action) => {
    return produce (state, draft => {
        switch(action.type){
            case 'ADD_CATEGORY_TO_QUIZ':{
                const {category} = action.payload;

                const categoryIndex = draft.categories.findIndex(item => item.id === category.id);
                if(categoryIndex < 0)
                    draft.categories.push({...category, questions:[], hits:0, miss:0});
                else
                    return draft;

                break;
            }
            case 'ADD_QUESTION_TO_QUIZ': {
                const {question, categoryId} = action.payload;
                const categoryIndex = draft.categories.findIndex(category => category.id === categoryId);

                if(categoryIndex >= 0){
                    const category = draft.categories[categoryIndex];
                    if(category.questions.length<10){
                        category.questions.push(question) &&
                        question.isHit ? category.hits++ : category.miss++;
                    }
                }
                else
                    return draft;


                break;
            }
            case 'UPDATE_LASTLEVEL_OF_CATEGORY':{
                const {category} = action.payload;

                const categoryIndex = draft.categories.findIndex(item => item.id === category.id);

                if(categoryIndex >= 0){
                    const categoryFound = draft.categories[categoryIndex];
                    categoryFound.lastLevel = category.lastLevel;
                }
                else
                    return draft;

                break;
            }
            default: {
                return draft;
            }
        }
    });
}

export default quiz;
