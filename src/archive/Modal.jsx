import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = ({ children }) => (
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-100 p-8 shadow-lg transition-all duration-500">
    {children}
  </div>
);

const Overlay = ({ children }) => (
  <div className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50 transition-all duration-500">
    {children}
  </div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="absolute right-8 top-4 translate-x-2 transform rounded-sm border-none bg-transparent p-1 transition-all duration-200 hover:bg-gray-200"
  >
    {children}
  </button>
);

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark className="h-6 w-6 text-gray-500" />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
