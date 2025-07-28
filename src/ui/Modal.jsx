import { cloneElement, createContext, useContext, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import ButtonIcon from './ButtonIcon';

const ModalContext = createContext();

function Modal({ children }) {
  const [openWindowName, setOpenWindowName] = useState('');

  const close = () => setOpenWindowName('');
  const open = setOpenWindowName;

  return (
    <ModalContext.Provider value={{ openWindowName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalButton({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function ModalWindow({ name, children, className }) {
  const { openWindowName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openWindowName) return null;

  return createPortal(
    <div className="overlay">
      <div className={`modal ${className}`} ref={ref}>
        <ButtonIcon onClick={close}>
          <HiXMark />
        </ButtonIcon>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = ModalButton;
Modal.Window = ModalWindow;

export default Modal;
