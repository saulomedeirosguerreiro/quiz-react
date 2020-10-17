import React from 'react';
import { FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import { ToastMessage } from '../../../context/ToastContext';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FaInfoCircle size={50} />,
  error: <FaTimesCircle size={50} />,
  success: <FaCheckCircle size={50} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <Container type={message.type || 'info'}>
      {icons[message.type || 'info']}
      <strong>{message.title}</strong>
    </Container>
  );
};

export default Toast;
