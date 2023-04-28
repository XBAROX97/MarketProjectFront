import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-8">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/" className="mt-8 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </Link>
      </div>
    </>
  );
}