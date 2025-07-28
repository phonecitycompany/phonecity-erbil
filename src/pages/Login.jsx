import React from 'react';

import Logo from '../ui/Logo';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';

function Login() {
  return (
    <div className="flex h-screen items-center justify-center px-6 ">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10 rounded-lg  bg-white p-10 shadow-lg ">
        <Logo size="lg" />

        <Heading as="h2">چوونەژورەوە</Heading>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
