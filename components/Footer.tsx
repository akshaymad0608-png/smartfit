import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, ArrowRight, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setIsSubscribed(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-brand-green/5 text-brand-darkGreen relative overflow-hidden pt-20 pb-10 border-t border-brand-darkGreen/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <div className="text-brand-green">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
               </div>
               <span className="font-heading text-2xl tracking-tight font-bold text-brand-darkGreen">SmartFit</span>
            </div>
            <p className="text-sm leading-relaxed text-brand-darkGreen/70 font-medium">
              Empowering you to build sustainable habits. No fads, just a balanced, holistic approach to a healthier life.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-darkGreen/10 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 text-brand-darkGreen/60"><Facebook size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-darkGreen/10 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 text-brand-darkGreen/60"><Twitter size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-darkGreen/10 flex items-center justify-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 text-brand-darkGreen/60"><Instagram size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-6 text-brand-darkGreen font-bold">Explore</h4>
            <ul className="space-y-3 text-sm text-brand-darkGreen/70 font-medium">
              <li><Link to="/guide" className="hover:text-brand-green transition-colors block py-1">Weight Loss Guide</Link></li>
              <li><Link to="/plan" className="hover:text-brand-green transition-colors block py-1">30-Day Plan</Link></li>
              <li><Link to="/diet" className="hover:text-brand-green transition-colors block py-1">Diet Charts</Link></li>
              <li><Link to="/exercises" className="hover:text-brand-green transition-colors block py-1">Home Workouts</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-xl mb-6 text-brand-darkGreen font-bold">Company</h4>
            <ul className="space-y-3 text-sm text-brand-darkGreen/70 font-medium">
              <li><Link to="/about" className="hover:text-brand-green transition-colors block py-1">About Author</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green transition-colors block py-1">Contact Support</Link></li>
              <li><Link to="/blog" className="hover:text-brand-green transition-colors block py-1">Latest Articles</Link></li>
              <li><button onClick={() => alert("Privacy Policy: Your data is safe with us. We do not sell your information.")} className="hover:text-brand-green transition-colors text-left py-1">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-xl mb-6 text-brand-darkGreen font-bold">Stay Inspired</h4>
            <p className="text-sm mb-4 text-brand-darkGreen/70">Join our community for weekly wellness tips.</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required
                className="bg-white border border-brand-darkGreen/10 text-brand-darkGreen px-4 py-3 rounded-lg focus:outline-none focus:border-brand-green transition-all w-full text-sm placeholder:text-brand-darkGreen/30 shadow-sm disabled:opacity-50"
                disabled={isSubscribed}
              />
              <button 
                type="submit" 
                disabled={isSubscribed}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center text-sm shadow-lg transform ${
                    isSubscribed 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-brand-darkGreen text-white hover:bg-brand-green hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {isSubscribed ? (
                  <>Subscribed <Check size={16} className="ml-2" /></>
                ) : (
                  <>Subscribe <ArrowRight size={16} className="ml-2" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-brand-darkGreen/10 pt-8 text-xs text-center text-brand-darkGreen/50 font-medium">
          <p className="mb-4 max-w-3xl mx-auto leading-relaxed">
            <strong>Medical Disclaimer:</strong> The content on this website is for informational purposes only. Always seek the advice of your physician regarding a medical condition.
          </p>
          <div className="flex justify-center items-center gap-2">
            <span>&copy; {new Date().getFullYear()} SmartFit.</span>
            <span className="w-1 h-1 rounded-full bg-brand-darkGreen/30"></span>
            <span>Holistic Wellness Design.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;