import React from 'react';

const Textarea = ({ className, ...rest }) => {
  return (
    <textarea
      className={`h-32 w-full rounded-lg border border-gray-300 bg-gray-50 p-2 shadow-sm ${className}`}
      {...rest}
    />
  );
};

export default Textarea;
