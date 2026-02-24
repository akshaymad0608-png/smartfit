import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-surface p-4">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist." 
        keywords="404, not found, error"
        noindex={true}
      />
      
      <div className="text-center max-w-lg">
        <div className="text-9xl font-black text-brand-green/10 font-heading select-none">404</div>
        <h1 className="text-4xl font-bold text-slate-900 -mt-12 mb-6 relative z-10">Page Not Found</h1>
        <p className="text-slate-500 mb-10 text-lg leading-relaxed">
          Oops! The page you're looking for seems to have gone on a detox. It might have been removed, renamed, or doesn't exist.
        </p>
        
        <div className="grid gap-4 sm:grid-cols-2">
           <Link to="/" className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-brand-green transition-all shadow-lg">
              <Home size={20} /> Go Home
           </Link>
           <Link to="/contact" className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:border-slate-400 transition-all">
              <HelpCircle size={20} /> Support
           </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;