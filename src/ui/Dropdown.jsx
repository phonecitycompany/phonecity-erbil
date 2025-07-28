import { useState } from 'react';

import Heading from './Heading';

import { useOutsideClick } from '../hooks/useOutsideClick';
import Button from './Button';
import ButtonIcon from './ButtonIcon';

function Dropdown({ children, className, openButton, openIcon, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 10); // 100 milliseconds = 0.1 second
  };

  const ref = useOutsideClick(close);

  return (
    <div className={`  relative inline-block ${className} `}>
      <div>
        {openButton ? (
          <Button className="text-base xl:text-xl 2xl:text-2xl 2xl:px-5 px-3" variation="confirm" onClick={toggleDropdown}>
            {openButton}
          </Button>
        ) : openIcon ? (
          <ButtonIcon onClick={toggleDropdown}>{openIcon}</ButtonIcon>
        ) : (
          'dropdown'
        )}
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="absolute left-0 top-[4.2rem] z-50 min-w-[10rem] origin-top-left divide-y divide-light-grey rounded-xl border-2 bg-white p-6  shadow-md focus:outline-none"
        >
          <Heading as="h4" className="mb-6 text-center">
            {title}
          </Heading>

          {children ? (
            children
          ) : (
            <MenuItem>
              <DropdownItem>add items</DropdownItem>
            </MenuItem>
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({ children }) {
  return <div className="py-3 last:pb-0">{children}</div>;
}

function DropdownItem({ active, children, className }) {
  return (
    <div
      className={`${active ? 'bg-main ' : ''
        }   mb-4  w-full text-lg text-dark-grey last:mb-0 ${className}`}
    >
      {children}
    </div>
  );
}

export { Dropdown, MenuItem, DropdownItem };
