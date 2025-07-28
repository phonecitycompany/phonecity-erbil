import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="translate-x-2 transform rounded-sm border-none bg-transparent p-1 transition-all duration-200 hover:bg-gray-100"
    >
      <HiEllipsisVertical className="h-6 w-6 text-gray-700" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return <></>;

  return createPortal(
    <ul
      className="fixed rounded-md bg-gray-50 shadow-md"
      style={{ right: `${position.x}px`, top: `${position.y}px` }}
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-4 border-none bg-transparent px-6 py-3 text-left text-lg transition-all duration-200 hover:bg-gray-50"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
