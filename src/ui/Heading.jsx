import React from 'react';

const Heading = ({ as: Tag = 'h1', children, className, ...rest }) => {
  const sizes = {
    h1: 'text-5xl font-semibold',
    h2: 'text-4xl font-semibold',
    h3: 'text-3xl font-semibold',
    h4: 'text-2xl font-medium',
    h5: 'text-xl font-medium',
    h6: 'text-lg font-normal',
  };

  return (
    <Tag className={`${className}  ${sizes[Tag]} ${rest.className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Heading;
