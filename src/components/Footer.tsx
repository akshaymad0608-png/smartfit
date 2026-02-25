import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Dumbbell } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-green text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20">
                <Dumbbell size={24} />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight">SmartFit</span>
            </Link>
            <p className="text-brand-gray mb-8 max-w-sm">
              Empowering you to achieve your fitness goals with science-backed plans and sustainable habits.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-card/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-card/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-card/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-4 text-brand-gray">
              <li><Link to="/plan" className="hover:text-brand-green transition-colors">30-Day Plan</Link></li>
              <li><Link to="/exercises" className="hover:text-brand-green transition-colors">Exercises</Link></li>
              <li><Link to="/diet" className="hover:text-brand-green transition-colors">Diet Plans</Link></li>
              <li><Link to="/guide" className="hover:text-brand-green transition-colors">Weight Loss Guide</Link></li>
              <li><Link to="/bmi" className="hover:text-brand-green transition-colors">BMI Calculator</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-heading">Stay Updated</h4>
            <p className="text-brand-gray mb-4 text-sm">Get the latest tips and workout plans directly to your inbox.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-brand-card border border-brand-gray/10 rounded-lg px-4 py-3 text-white placeholder-brand-gray focus:outline-none focus:border-brand-green transition-colors"
              />
              <button type="submit" className="bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-brand-blue transition-colors shadow-lg shadow-brand-green/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-brand-card/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-gray">
          <p>&copy; {new Date().getFullYear()} SmartFit. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
