import React, { useState } from 'react';
import { Dumbbell, Clock, Flame, Play, X } from 'lucide-react';
import SEO from '../components/SEO';

interface Workout {
  id: number;
  title: string;
  duration: string;
  calories: string;
  level: string;
  image: string;
  videoUrl?: string;
  description?: string;
}

const Exercise: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const categories = ['All', 'Cardio', 'Strength', 'HIIT', 'Yoga'];

  const workouts: Workout[] = [
    {
      id: 1,
      title: 'Full Body HIIT',
      duration: '20 min',
      calories: '300 kcal',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
      description: 'High-intensity interval training to burn fat and build endurance. No equipment needed.'
    },
    {
      id: 2,
      title: 'Core Crusher',
      duration: '15 min',
      calories: '150 kcal',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/1f8yoFFdkcY',
      description: 'Strengthen your core with these effective ab exercises.'
    },
    {
      id: 3,
      title: 'Morning Yoga Flow',
      duration: '30 min',
      calories: '120 kcal',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/sTANio_2E0Q',
      description: 'Start your day with energy and focus with this gentle yoga flow.'
    },
    {
      id: 4,
      title: 'Upper Body Power',
      duration: '25 min',
      calories: '200 kcal',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/qWy_aOlB45Y',
      description: 'Build strength in your arms, chest, and back with this intense workout.'
    },
    {
      id: 5,
      title: 'Leg Day Blast',
      duration: '30 min',
      calories: '250 kcal',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/UItWltVZZmE',
      description: 'Tone your legs and glutes with this targeted lower body routine.'
    },
    {
      id: 6,
      title: 'Cardio Kickboxing',
      duration: '40 min',
      calories: '400 kcal',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/j64BBgBGNIU',
      description: 'Punch and kick your way to fitness with this high-energy cardio workout.'
    },
    {
      id: 7,
      title: 'Total Body Strength',
      duration: '35 min',
      calories: '320 kcal',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/embed/UBMk30rjy0o',
      description: 'Build muscle and burn fat with this comprehensive full-body dumbbell strength workout.'
    }
  ];

  const filteredWorkouts = selectedCategory === 'All' 
    ? workouts 
    : workouts.filter(w => w.title.includes(selectedCategory) || w.level.includes(selectedCategory)); // Simple filter logic for demo

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Workout Library - SmartFit Exercises" 
        description="Browse our library of effective workouts for all fitness levels." 
        keywords="workouts, exercises, fitness library, home workout"
      />

      {/* Hero */}
      <div className="bg-brand-surface pt-32 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-heading animate-fade-in-up">Workout Library</h1>
          <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Find the perfect workout for your schedule and fitness level.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                selectedCategory === cat 
                  ? 'bg-brand-green text-white shadow-brand-green/30 shadow-lg transform -translate-y-1' 
                  : 'bg-brand-card text-brand-gray hover:bg-brand-surface hover:text-brand-darkGreen'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workout Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {filteredWorkouts.map((workout) => (
            <div 
              key={workout.id} 
              className="group bg-brand-card rounded-[2rem] overflow-hidden shadow-card border border-brand-gray/5 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedWorkout(workout)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={workout.image} 
                  alt={workout.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-brand-card/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                    <Play size={32} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-brand-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-darkGreen uppercase tracking-wide">
                  {workout.level}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-darkGreen mb-4 font-heading group-hover:text-brand-green transition-colors">{workout.title}</h3>
                
                <div className="flex items-center justify-between text-brand-gray text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-brand-green" />
                    {workout.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame size={16} className="text-brand-accent" />
                    {workout.calories}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-card rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setSelectedWorkout(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-brand-card/50 backdrop-blur-md rounded-full text-brand-darkGreen hover:bg-brand-card transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="aspect-video w-full bg-black relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={selectedWorkout.videoUrl} 
                title={selectedWorkout.title} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              {selectedWorkout.videoUrl && (
                <a 
                  href={selectedWorkout.videoUrl.replace('embed/', 'watch?v=')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-80 hover:opacity-100 transition-opacity shadow-lg flex items-center gap-2 z-20"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
            
            <div className="p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen font-heading">{selectedWorkout.title}</h2>
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-brand-surface rounded-full text-sm font-bold text-brand-gray flex items-center gap-2">
                    <Clock size={16} /> {selectedWorkout.duration}
                  </span>
                  <span className="px-4 py-2 bg-brand-surface rounded-full text-sm font-bold text-brand-gray flex items-center gap-2">
                    <Flame size={16} /> {selectedWorkout.calories}
                  </span>
                </div>
              </div>
              
              <p className="text-xl text-brand-gray leading-relaxed mb-8">
                {selectedWorkout.description}
              </p>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-brand-green text-white font-bold py-4 rounded-2xl hover:bg-brand-blue transition-colors shadow-lg shadow-brand-green/20">
                  Add to Schedule
                </button>
                <button className="flex-1 bg-brand-surface text-brand-darkGreen font-bold py-4 rounded-2xl hover:bg-brand-gray/10 transition-colors border border-brand-gray/10">
                  Mark as Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
