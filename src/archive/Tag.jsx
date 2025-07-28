import React from 'react';

const Tag = ({ type, children }) => {
  const colors = {
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1 font-semibold uppercase ${colors[type]}`}
    >
      {children}
    </span>
  );
};

export default Tag;
