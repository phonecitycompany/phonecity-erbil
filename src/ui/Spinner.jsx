import React from 'react';

const Spinner = () => {
  return (
    <div className="from-brand-600  mx-auto my-12 h-16 w-16 animate-spin rounded-full bg-gradient-to-br to-transparent">
      <div className="to-brand-600 mask-gradient absolute inset-0 rounded-full bg-gradient-to-br from-transparent" />
    </div>
  );
};

export default Spinner;
