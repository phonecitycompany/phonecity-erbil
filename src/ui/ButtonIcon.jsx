import React from 'react';

const ButtonIcon = ({ children, className, ...props }) => {
  return (
    <button
      className={` ${className} text-4xl transition-all duration-200 first:text-main  hover:first:text-main-dark`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
