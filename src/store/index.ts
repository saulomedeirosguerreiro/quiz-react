import {createStore} from 'redux';
import { IQuizState } from './modules/quiz/types';
import rootReducer from './modules/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
export interface IState{
    cart : IQuizState;
}

const store = createStore(rootReducer, composeWithDevTools());

export default store;
