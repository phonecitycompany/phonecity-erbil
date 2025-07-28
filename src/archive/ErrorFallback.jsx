import React from 'react';

const StyledErrorFallback = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-12">
      <div className="flex-0.5  rounded-md border border-gray-200 bg-gray-100 p-12 text-center ">
        <h1 className="mb-6 text-4xl font-bold">Oops!</h1>
        <p className="font-sono mb-12 text-gray-500">
          Something went wrong. Please try again later.
        </p>
      </div>
    </main>
  );
};

export default StyledErrorFallback;
