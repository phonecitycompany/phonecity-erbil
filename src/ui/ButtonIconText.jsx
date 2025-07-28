import React from 'react';

const ButtonIconText = ({ children, className, icon, text, ...props }) => {
  return (
    <button
      className={`rtl  flex items-center gap-2 first:text-dark-grey  hover:first:text-main ${className}`}
      {...props}
    >
      <p className={`text-3xl transition-all duration-200 `}>{icon}</p>
      <p className="text-xl font-semibold">{text}</p>
    </button>
  );
};

export default ButtonIconText;
