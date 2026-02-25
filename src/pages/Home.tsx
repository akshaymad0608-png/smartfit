import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Flame, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="SmartFit - Your Personal Weight Loss Blueprint" 
        description="Achieve your weight loss goals with our scientifically backed 30-day plan." 
        keywords="weight loss, diet plan, workout routine, healthy lifestyle"
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand-green/20 bg-brand-card text-sm font-bold mb-6 text-brand-green shadow-sm animate-fade-in-up">
              New: 30-Day Transformation Challenge
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-heading text-brand-darkGreen animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Your Blueprint for <span className="text-gradient">Sustainable</span> Weight Loss
            </h1>
            <p className="text-xl md:text-2xl text-brand-gray font-medium max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              No crash diets. No impossible workouts. Just science-backed plans designed for real life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/plan" className="btn-primary w-full sm:w-auto">
                Start Your Journey <ArrowRight size={20} />
              </Link>
              <Link to="/guide" className="btn-secondary w-full sm:w-auto">
                Read the Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4 font-heading">Our Philosophy</h2>
            <p className="text-xl text-brand-gray max-w-2xl mx-auto">We believe in long-term results over short-term fixes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-brand-card border border-brand-gray/10 hover:shadow-card transition-all duration-300">
              <div className="w-14 h-14 bg-brand-surface rounded-2xl flex items-center justify-center mb-6 shadow-sm text-brand-green">
                <Activity size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-darkGreen mb-3">Science-Based</h3>
              <p className="text-brand-gray">Every recommendation is backed by peer-reviewed research, not trends.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-brand-card border border-brand-gray/10 hover:shadow-card transition-all duration-300">
              <div className="w-14 h-14 bg-brand-surface rounded-2xl flex items-center justify-center mb-6 shadow-sm text-brand-accent">
                <Flame size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-darkGreen mb-3">Sustainable</h3>
              <p className="text-brand-gray">Plans designed to fit into your lifestyle, making consistency effortless.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-brand-card border border-brand-gray/10 hover:shadow-card transition-all duration-300">
              <div className="w-14 h-14 bg-brand-surface rounded-2xl flex items-center justify-center mb-6 shadow-sm text-brand-blue">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-brand-darkGreen mb-3">Efficient</h3>
              <p className="text-brand-gray">Maximize results with optimized workouts and nutrition strategies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Goal Section with Fixed JSX */}
      <section className="py-20 bg-brand-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] bg-brand-card p-10 md:p-20 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-brand-darkGreen">Consistency &gt; Intensity</h2>
                <p className="text-xl text-brand-gray mb-8">
                  It's not about being perfect every day. It's about showing up. Our 30-day plan helps you build habits that last a lifetime.
                </p>
                <Link to="/plan" className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:bg-brand-blue transition-all duration-300 shadow-lg">
                  Start the Challenge <ArrowRight size={20} />
                </Link>
              </div>
              <div className="relative">
                 <div className="aspect-square rounded-[2rem] bg-brand-surface/50 backdrop-blur-md border border-brand-gray/10 p-8 flex items-center justify-center">
                    <div className="text-center">
                       <div className="text-6xl font-bold mb-2 text-brand-darkGreen">30</div>
                       <div className="text-xl font-medium text-brand-gray">Days to a New You</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
