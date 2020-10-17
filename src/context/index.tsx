import React from 'react';

import { Provider } from 'react-redux';
import { ToastProvider } from './ToastContext';
import store from '../store';

const AppProvider: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastProvider>{children}</ToastProvider>
    </Provider>
  );
};

export default AppProvider;
