import React from 'react';

const Button = ({ children, variation, size, className, ...rest }) => {
  let sizeClass = '';
  let variationClass = '';

  switch (size) {
    case 'small':
      sizeClass = 'text-base py-2 px-4 font-medium ';
      break;
    case 'large':
      sizeClass = 'text-xl py-4 px-10 font-semibold';
      break;
  }

  switch (variation) {
    case 'confirm':
      variationClass =
        'bg-main hover:bg-main-dark text-white  focus:outline-main ';
      break;
    case 'discard':
      variationClass =
        ' bg-red hover:bg-red-dark text-white focus:outline-red ';
      break;
  }

  return (
    <button
      className={`rounded-md text-center transition-all duration-300 ease-in-out focus:outline focus:outline-2 focus:outline-offset-2  focus:outline-main  ${sizeClass} ${variationClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  variation: 'confirm',
  size: 'large',
};

export default Button;
