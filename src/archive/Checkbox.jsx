import React from 'react';

function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="text-brand-600  focus:ring-brand-600 h-6 w-6 rounded-md focus:ring-2 focus:ring-offset-2"
      />
      <label
        htmlFor={!disabled ? id : ''}
        className="flex-1 text-sm font-medium text-gray-700"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
