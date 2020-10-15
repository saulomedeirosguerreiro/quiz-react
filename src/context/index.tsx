import React from 'react';

import {ToastProvider} from './ToastContext';
import {Provider} from 'react-redux';
import store from '../store';
const AppProvider:React.FC = ({children}) => {

  return (
      <Provider store={store}>
         <ToastProvider>
             {children}
         </ToastProvider>
      </Provider>
  );
};

export default AppProvider;
