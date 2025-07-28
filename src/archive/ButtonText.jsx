import React from 'react';

const ButtonText = ({ children, ...props }) => {
  return (
    <button
      className="text-brand-600 hover:text-brand-700 active:text-brand-700 focus:ring-brand-500 rounded-sm border border-transparent bg-transparent text-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonText;
