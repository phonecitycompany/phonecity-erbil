import Heading from '../ui/Heading';
import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div>
            <Heading
              as="h1"
              className="text-center text-3xl font-extrabold text-gray-900"
            >
              The page you are looking for could not be found 😢
            </Heading>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={moveBack}
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              &larr; Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
