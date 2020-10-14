import React, {createContext,useState,useCallback,useContext} from 'react';
import {v4 as uuid} from 'uuid';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData{
    addToast(message : Omit<ToastMessage,'id'>): void;
    removeAllToast(): void;
}

export interface ToastMessage{
    id: string;
    title: string;
    type?: 'error' | 'success' | 'info';
  }

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({children}) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({title, type} : Omit<ToastMessage,'id'>) => {
        const message = {
            id:uuid(),
            title,
            type
          };

          setMessages(oldMessages => [...oldMessages,  message]);
    },[]);
    const removeAllToast = useCallback(() => {
        setMessages([]);

    },[]);

    return (
        <ToastContext.Provider value={{addToast, removeAllToast}}>
            {children}
            <ToastContainer messages={messages}/>
        </ToastContext.Provider>
    );
};

export function useToast(){
    const context = useContext(ToastContext);

    if(!context){
      throw new Error('useToast must be used within an ToastProvider')
    }

    return context;
  }
