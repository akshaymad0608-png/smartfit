import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
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
            ? 'bg-brand-cream/95 backdrop-blur-md border-b border-brand-darkGreen/5 py-4 shadow-sm' 
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
              <div className="w-8 h-8 text-brand-green flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
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
              <span className={`text-2xl font-heading font-medium tracking-tight text-brand-darkGreen`}>
                SmartFit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-accent after:transition-all after:duration-300 hover:after:w-full ${
                      isActive(link.path)
                        ? 'text-brand-darkGreen font-bold after:w-full'
                        : 'text-brand-darkGreen/70 hover:text-brand-darkGreen'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-6">
               <Link 
                  to="/plan" 
                  className="group flex items-center gap-2 bg-brand-darkGreen hover:bg-brand-green text-brand-cream px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
               >
                  Start Plan <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 p-2 text-brand-darkGreen focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-cream lg:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
          <div className="flex-1 space-y-4">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block text-3xl font-heading text-brand-darkGreen hover:text-brand-green transition-colors duration-300 transform ${
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
              className="flex items-center justify-center w-full py-5 bg-brand-darkGreen text-brand-cream rounded-full font-medium text-lg shadow-soft"
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