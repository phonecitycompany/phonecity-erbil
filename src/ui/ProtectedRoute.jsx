import { Fragment } from 'react';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!
        isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return <Fragment>{children}</Fragment>;
}

export default ProtectedRoute;
