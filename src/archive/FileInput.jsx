import React from 'react';

const FileInput = ({ className, ...props }) => (
  <div className={`relative ${className}`}>
    <input {...props} type="file" className="sr-only" />
    <label
      className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      htmlFor="file-upload"
    >
      Upload a file
    </label>
  </div>
);

export default FileInput;
