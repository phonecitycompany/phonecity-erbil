import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavButton = ({ children, className, to, ...props }) => {
  const location = useLocation();
  const currentSection = location.pathname;

  const active =
    'bg-main-transparent border-r-4 border-r-main-light hover:border-r-main-light ';

  return (
    <NavLink to={to}>
      <button
        className={`first:text-light-grey hover:bg-main-transparent overflow-hidden rounded-md border-r-4 py-5 pl-[12.5px] pr-[10px]  text-4xl transition-all duration-100 ease-in-out hover:border-r-transparent   
        ${currentSection === to ? active : 'border-r-white'} 
        ${className}`}
        {...props}
      >
        {children}
      </button>
    </NavLink>
  );
};

export default NavButton;
