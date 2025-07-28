import React from 'react';

function FormRow({ label, error, children }) {
  return (
    <div className="grid-cols-24rem-1fr-1.2fr gap-2.4rem py-1.2rem not-last:border-b border-grey-100 grid items-center first:pt-0 last:pb-0">
      {label && (
        <label className="text-base font-medium" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}

export default FormRow;
