import styled , {css} from 'styled-components';

interface ToastProps {
  type?: 'info' | 'error' | 'success';
}


const toastTypeVariations = {
  info: css`
    border: 2px solid #3172b7;
    > svg {
      color: #3172b7;
    }
  `,
  error: css`
    border: 2px solid #c53030;
    > svg {
      color: #c53030;
    }
  `,
  success: css`
    border: 2px solid #008f26;
    > svg {
      color: #008f26;
    }
  `
};


export const Container = styled.div<ToastProps>`
  width: 60vw;
  height: 30vh;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content:center;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  background: #f3f3f3;
  color: #424242;

  ${(props) => toastTypeVariations[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin: 4px 12px 0 0;
  }

  strong{
    margin-top: 10px;
  }

  button {
    position: absolute;
    right: 8px;
    top: 15px;
    opacity: 0.6;
    background: transparent;
    border: 0;
    color: inherit;
  }
`;
