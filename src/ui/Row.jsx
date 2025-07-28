import React from 'react';

const Row = ({ type = 'vertical', children, className }) => {
  const horizontalStyles = 'justify-between items-center';
  const verticalStyles = 'flex-col gap-4';

  const styles = type === 'horizontal' ? horizontalStyles : verticalStyles;

  return <div className={`flex ${styles} ${className}`}>{children}</div>;
};

export default Row;
