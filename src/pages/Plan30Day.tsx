import React, { useState } from 'react';
import { CheckCircle, Lock, Star } from 'lucide-react';
import SEO from '../components/SEO';

const Plan30Day: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getDayStatus = (day: number) => {
    if (day < currentDay) return 'completed';
    if (day === currentDay) return 'active';
    return 'locked';
  };

  const getDayContent = (day: number) => {
    // Placeholder content logic
    if (day % 7 === 0) return { title: 'Rest & Recovery', type: 'Rest' };
    if (day % 2 === 0) return { title: 'Lower Body Strength', type: 'Workout' };
    return { title: 'Upper Body & Cardio', type: 'Workout' };
  };

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="30-Day Transformation Plan - SmartFit" 
        description="Join our 30-day challenge to transform your body and mind." 
        keywords="30 day challenge, transformation plan, fitness challenge"
      />

      {/* Hero */}
      <div className="bg-brand-surface pt-32 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-card/20 bg-brand-card/10 text-sm font-bold mb-6 text-brand-accent shadow-sm animate-fade-in-up">
            Challenge Accepted
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-heading animate-fade-in-up" style={{ animationDelay: '0.1s' }}>30-Day Transformation</h1>
          <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Commit to the process. Trust the plan. See the results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Progress Bar */}
        <div className="bg-brand-card rounded-[2rem] p-8 shadow-card border border-brand-gray/5 mb-12 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center text-brand-green font-bold text-2xl shadow-inner">
              {Math.round(((currentDay - 1) / 30) * 100)}%
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-darkGreen font-heading">Your Progress</h3>
              <p className="text-brand-gray text-sm font-medium">Day {currentDay} of 30</p>
            </div>
          </div>
          <button className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-lg shadow-brand-green/20">
            Continue
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {days.map((day) => {
            const status = getDayStatus(day);
            const content = getDayContent(day);
            
            return (
              <div 
                key={day} 
                className={`relative p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer group ${
                  status === 'active' 
                    ? 'bg-brand-green text-white border-brand-green shadow-xl transform -translate-y-2 scale-105 z-10' 
                    : status === 'completed'
                    ? 'bg-brand-green/10 text-brand-darkGreen border-brand-green/20 hover:bg-brand-green/20'
                    : 'bg-brand-card text-brand-gray border-brand-gray/10 opacity-60 hover:opacity-100'
                }`}
                onClick={() => setCurrentDay(day)}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-2xl font-bold font-heading ${status === 'active' ? 'text-brand-accent' : ''}`}>{day}</span>
                  {status === 'completed' ? (
                    <CheckCircle size={20} className="text-brand-green" />
                  ) : status === 'locked' ? (
                    <Lock size={20} className="text-brand-gray/50" />
                  ) : (
                    <Star size={20} className="text-brand-accent fill-brand-accent animate-pulse" />
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-70">{content.type}</p>
                  <p className={`text-sm font-bold leading-tight ${status === 'active' ? 'text-white' : 'text-brand-darkGreen'}`}>
                    {content.title}
                  </p>
                </div>
                
                {status === 'active' && (
                  <div className="absolute inset-0 rounded-[2rem] ring-4 ring-brand-green/20 pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plan30Day;
