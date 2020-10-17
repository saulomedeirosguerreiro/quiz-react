import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IQuizState } from './modules/quiz/types';
import rootReducer from './modules/rootReducer';

export interface IState {
  quiz: IQuizState;
}

const store = createStore(rootReducer, composeWithDevTools());

export default store;
