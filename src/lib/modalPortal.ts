import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById('modal_root');

  if (!el) {
    throw new Error('modal root not found');
  }

  return ReactDOM.createPortal(children, el);
};
