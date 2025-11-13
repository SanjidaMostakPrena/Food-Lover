import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
     useEffect(() => {
    document.title = "ErrorPage";
  }, []);

    return (
       <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <img
            src="https://i.ibb.co.com/mC6JvSKP/su7z-qtkr-220705.jpg"
            alt="404 Not Found"
            className="w-64 mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">Oops! Page not found.</h1>
          <p className="mb-6">We couldn’t find the page you’re looking for.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
    );
};

export default ErrorPage;
