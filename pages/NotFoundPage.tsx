
import React from 'react';
import { Link } from 'react-router-dom';
import { TicketIcon } from '../components/icons';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <TicketIcon className="w-24 h-24 text-primary-400 mb-4" />
      <h1 className="text-6xl font-extrabold text-primary-600 dark:text-primary-400">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2 mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Oops! The page you're looking for seems to have taken a day off. Let's get you back to the main event.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-transform transform hover:scale-105"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
