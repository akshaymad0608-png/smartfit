import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-surface text-center px-4">
      <SEO title="Page Not Found - SmartFit" description="The page you are looking for does not exist." />
      <h1 className="text-6xl font-bold text-brand-darkGreen mb-4">404</h1>
      <p className="text-xl text-brand-gray mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-brand-green text-white px-6 py-3 rounded-full font-bold hover:bg-brand-blue transition-colors">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
