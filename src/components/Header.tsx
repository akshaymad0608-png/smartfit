import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Facebook, Instagram, Twitter, Dumbbell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Guide', path: '/guide' },
    { name: 'Exercises', path: '/exercises' },
    { name: 'Diet Plans', path: '/diet' },
    { name: '30-Day Plan', path: '/plan' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled 
            ? 'bg-brand-card/80 backdrop-blur-lg border-b border-brand-gray/10 py-3 shadow-soft' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group relative z-50" 
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-brand-green text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20 transform group-hover:rotate-6 transition-all duration-300">
                <Dumbbell size={24} />
              </div>
              <span className={`text-2xl font-heading font-bold tracking-tight text-brand-darkGreen`}>
                SmartFit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <nav className="flex items-center gap-1 bg-brand-card/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-brand-gray/10 shadow-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
                      isActive(link.path)
                        ? 'bg-brand-green text-white shadow-md'
                        : 'text-brand-gray hover:text-brand-darkGreen hover:bg-brand-gray/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
               <div className="flex items-center gap-4 mr-2">
                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-green transition-colors" aria-label="Facebook">
                   <Facebook size={20} />
                 </a>
                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-green transition-colors" aria-label="Instagram">
                   <Instagram size={20} />
                 </a>
                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-green transition-colors" aria-label="Twitter">
                   <Twitter size={20} />
                 </a>
               </div>
               <Link 
                  to="/plan" 
                  className="group flex items-center gap-2 bg-brand-green hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg shadow-brand-green/25 hover:shadow-brand-green/40 hover:-translate-y-0.5"
               >
                  Start Plan <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 p-2 text-brand-darkGreen focus:outline-none bg-brand-card/50 backdrop-blur-sm rounded-lg border border-brand-gray/10"
              aria-label="Toggle menu"
            >
              <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-card/95 backdrop-blur-xl lg:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
          <div className="flex-1 space-y-2">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-4xl font-heading font-bold text-brand-darkGreen hover:text-brand-green transition-all duration-300 transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div 
            className={`mt-auto transition-all duration-500 delay-300 transform ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Link 
              to="/plan" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-5 bg-brand-green text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-green/20"
            >
              Start 30-Day Challenge
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
