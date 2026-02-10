import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart, Zap, Play, Flame, Activity, X, Info, Filter, Dumbbell, Heart, Timer, Target, ChevronRight, Check } from 'lucide-react';
import SEO from '../components/SEO';

const Exercise: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Beginner', 'HIIT', 'Strength', 'Yoga', 'Cardio'];

  const workouts = [
    {
      id: 1,
      title: "10-Minute Morning Blast",
      duration: "10 min",
      level: "Beginner",
      calories: "80-120",
      type: "Cardio",
      tags: ["Cardio", "Beginner"],
      intensity: 3, // 1-5
      focus: "Full Body Activation",
      description: "Wake up your body and metabolism with this quick, equipment-free routine designed to get your heart rate up immediately.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      exercises: [
        { name: "March in Place", reps: "2 min" },
        { name: "Arm Circles", reps: "1 min" },
        { name: "Half Squats", reps: "2 min" },
        { name: "Wall Pushups", reps: "2 min" },
        { name: "High Knees (Slow)", reps: "2 min" },
        { name: "Standing Stretch", reps: "1 min" }
      ]
    },
    {
      id: 2,
      title: "20-Minute Fat Burner",
      duration: "20 min",
      level: "Intermediate",
      calories: "200-250",
      type: "HIIT",
      tags: ["HIIT", "Cardio"],
      intensity: 5,
      focus: "Fat Loss & Endurance",
      description: "High-intensity interval training to torch calories in a short amount of time. Keep rests short.",
      image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=800&auto=format&fit=crop",
      exercises: [
        { name: "Jumping Jacks", reps: "30s Work / 30s Rest" },
        { name: "Bodyweight Squats", reps: "30s Work / 30s Rest" },
        { name: "Pushups", reps: "30s Work / 30s Rest" },
        { name: "Lunges", reps: "30s Work / 30s Rest" },
        { name: "Plank Hold", reps: "30s Work / 30s Rest" },
        { name: "Mountain Climbers", reps: "30s Work / 30s Rest" }
      ]
    },
    {
      id: 3,
      title: "Core & Abs Crusher",
      duration: "15 min",
      level: "All Levels",
      calories: "100-150",
      type: "Strength",
      tags: ["Strength", "Beginner"],
      intensity: 4,
      focus: "Abdominals & Obliques",
      description: "Strengthen your core to improve posture and reduce back pain. Focus on squeezing the abs.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
      exercises: [
        { name: "Crunches", reps: "20 reps" },
        { name: "Leg Raises", reps: "15 reps" },
        { name: "Russian Twists", reps: "30 reps" },
        { name: "Plank Hold", reps: "45 sec" },
        { name: "Bicycle Crunches", reps: "20 reps" },
        { name: "Cobra Stretch", reps: "1 min" }
      ]
    },
    {
      id: 4,
      title: "Full Body Strength",
      duration: "30 min",
      level: "Intermediate",
      calories: "250-300",
      type: "Strength",
      tags: ["Strength", "Intermediate"],
      intensity: 4,
      focus: "Muscle Tone & Power",
      description: "A comprehensive routine targeting all major muscle groups using just your bodyweight.",
      image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800&auto=format&fit=crop",
      exercises: [
        { name: "Pushups", reps: "3 sets x 12" },
        { name: "Squats", reps: "3 sets x 15" },
        { name: "Lunges", reps: "3 sets x 10/leg" },
        { name: "Chair Dips", reps: "3 sets x 10" },
        { name: "Glute Bridges", reps: "3 sets x 15" },
        { name: "Plank", reps: "3 sets x 1 min" }
      ]
    },
    {
      id: 5,
      title: "Yoga for Weight Loss",
      duration: "25 min",
      level: "Beginner",
      calories: "100-120",
      type: "Flexibility",
      tags: ["Yoga", "Beginner"],
      intensity: 2,
      focus: "Flexibility & Mindfulness",
      description: "A flow to lower stress cortisol levels while gently engaging muscles and improving flexibility.",
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800&auto=format&fit=crop",
      exercises: [
        { name: "Sun Salutation A", reps: "5 rounds" },
        { name: "Warrior I & II", reps: "Hold 5 breaths" },
        { name: "Triangle Pose", reps: "Hold 5 breaths" },
        { name: "Chair Pose", reps: "Hold 5 breaths" },
        { name: "Boat Pose (Core)", reps: "Hold 3 breaths" },
        { name: "Child's Pose", reps: "Rest" }
      ]
    },
    {
      id: 6,
      title: "Legs & Glutes Tone",
      duration: "20 min",
      level: "Beginner",
      calories: "150-180",
      type: "Strength",
      tags: ["Strength", "Beginner"],
      intensity: 3,
      focus: "Lower Body",
      description: "Sculpt and tone your legs and glutes. Keep your weight in your heels for squats.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      exercises: [
        { name: "Squats", reps: "20 reps" },
        { name: "Side Lunges", reps: "15/leg" },
        { name: "Donkey Kicks", reps: "15/leg" },
        { name: "Calf Raises", reps: "20 reps" },
        { name: "Wall Sit", reps: "45 sec" },
        { name: "Sumo Squats", reps: "15 reps" }
      ]
    }
  ];

  const filteredWorkouts = useMemo(() => {
    if (activeCategory === 'All') return workouts;
    return workouts.filter(w => w.tags.includes(activeCategory));
  }, [activeCategory, workouts]);

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Home Workouts - Best Weight Loss Plan Exercises" 
        description="Free daily home workout routines for weight loss. Cardio, HIIT, Strength, and Yoga exercises requiring no equipment." 
        keywords="home workout, cardio exercises, no equipment workout, yoga for weight loss, weight loss plan"
      />

      {/* Hero Section */}
      <div className="bg-brand-green/5 pt-32 pb-32 text-center text-brand-darkGreen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white backdrop-blur-md border border-brand-darkGreen/10 text-xs font-bold uppercase tracking-wider mb-6 text-brand-green shadow-sm">
            <Activity size={14} /> Library Updated
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-heading">Home Workout Library</h1>
          <p className="text-xl text-brand-darkGreen/70 max-w-2xl mx-auto font-medium leading-relaxed">
            Effective routines designed to burn fat and build muscle. <br className="hidden md:block"/>No gym required, just you and your consistency.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 opacity-90 text-brand-darkGreen/80">
             <div className="flex items-center gap-2 text-sm font-bold"><Check size={16} className="text-brand-green"/> No Equipment</div>
             <div className="hidden md:block w-1 h-1 bg-brand-darkGreen/30 rounded-full mt-2"></div>
             <div className="flex items-center gap-2 text-sm font-bold"><Check size={16} className="text-brand-green"/> 10-30 Mins</div>
             <div className="hidden md:block w-1 h-1 bg-brand-darkGreen/30 rounded-full mt-2"></div>
             <div className="flex items-center gap-2 text-sm font-bold"><Check size={16} className="text-brand-green"/> 100% Free</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-3 no-scrollbar md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${
                activeCategory === cat
                  ? 'bg-brand-green text-white shadow-brand-green/30 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Workouts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkouts.map((workout) => (
            <div 
              key={workout.id} 
              onClick={() => setSelectedWorkout(workout)}
              className="bg-white rounded-[2.5rem] shadow-xl border border-white overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group h-full cursor-pointer relative"
            >
              
              {/* Card Image Header */}
              <div className="h-64 relative overflow-hidden">
                <img src={workout.image} alt={workout.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                  <div className="flex justify-between items-end w-full">
                     <div>
                       <div className="flex items-center text-brand-green text-[10px] font-black uppercase tracking-widest mb-2 bg-black/30 backdrop-blur w-fit px-2 py-1 rounded-lg">
                          {workout.focus}
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-1 leading-none drop-shadow-md font-heading">{workout.title}</h3>
                     </div>
                  </div>
                </div>
                
                {/* Level Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide backdrop-blur-md shadow-lg border border-white/20 ${
                    workout.level === 'Beginner' ? 'bg-green-500/90 text-white' : 
                    workout.level === 'Intermediate' ? 'bg-yellow-500/90 text-white' : 'bg-red-500/90 text-white'
                  }`}>
                    {workout.level}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center text-slate-700 font-bold text-sm">
                    <Clock size={16} className="mr-2 text-brand-blue" /> {workout.duration}
                  </div>
                  <div className="w-px h-6 bg-slate-200"></div>
                  <div className="flex items-center text-slate-700 font-bold text-sm">
                    <Flame size={16} className="mr-2 text-orange-500 fill-orange-500" /> {workout.calories}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                     <span>Intensity</span>
                     <span>{workout.intensity}/5</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                     <div 
                        className={`h-full rounded-full ${
                          workout.intensity <= 2 ? 'bg-green-400' : 
                          workout.intensity <= 4 ? 'bg-brand-blue' : 'bg-red-500'
                        }`} 
                        style={{ width: `${(workout.intensity / 5) * 100}%` }}
                      ></div>
                  </div>
                </div>
                
                <div className="mt-auto">
                 <button className="w-full flex items-center justify-center py-4 bg-slate-900 rounded-2xl text-white font-bold hover:bg-brand-green transition-all shadow-lg active:scale-95 group-hover:shadow-brand-green/20">
                    <Play size={20} className="mr-2 fill-current" /> View Routine
                 </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Motivation Banner */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue rounded-full blur-[150px] opacity-20"></div>
            </div>
            
            <div className="relative z-10">
              <Activity size={56} className="mx-auto mb-8 text-brand-green" />
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-heading">Consistency &gt; Intensity</h2>
              <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">Random workouts get random results. Follow our structured 30-Day Plan to build habits that last a lifetime.</p>
              <Link to="/plan" className="inline-block bg-white text-slate-900 font-bold px-12 py-5 rounded-2xl hover:bg-brand-green hover:text-white transition-all shadow-glow hover:-translate-y-1">
                  Start 30-Day Challenge
              </Link>
            </div>
        </div>
      </div>

      {/* WORKOUT MODAL */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative animate-scale-in">
             <button 
               onClick={() => setSelectedWorkout(null)}
               className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur text-white hover:bg-black/40 rounded-full transition-colors z-20"
             >
               <X size={24} />
             </button>

             <div className="relative h-72">
               <img src={selectedWorkout.image} className="w-full h-full object-cover" alt="Workout Cover"/>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="flex gap-2 mb-3">
                     {selectedWorkout.tags.map((tag: string) => (
                       <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-[10px] font-bold uppercase tracking-wide text-white border border-white/10">
                         {tag}
                       </span>
                     ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white font-heading leading-none">{selectedWorkout.title}</h2>
               </div>
             </div>

             <div className="p-8 md:p-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <Clock size={20} className="text-brand-blue mx-auto mb-2"/> 
                    <p className="text-xs text-slate-500 font-bold uppercase">Duration</p>
                    <p className="font-bold text-slate-900">{selectedWorkout.duration}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <Flame size={20} className="text-orange-500 fill-orange-500 mx-auto mb-2"/> 
                    <p className="text-xs text-slate-500 font-bold uppercase">Burn</p>
                    <p className="font-bold text-slate-900">{selectedWorkout.calories}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center col-span-2 md:col-span-1">
                    <Target size={20} className="text-brand-green mx-auto mb-2"/> 
                    <p className="text-xs text-slate-500 font-bold uppercase">Level</p>
                    <p className="font-bold text-slate-900">{selectedWorkout.level}</p>
                  </div>
                </div>

                <div className="mb-8">
                   <h3 className="font-bold text-slate-900 text-lg mb-2">About this workout</h3>
                   <p className="text-slate-600 leading-relaxed">{selectedWorkout.description}</p>
                </div>

                <h3 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-2">
                  <Activity size={20} className="text-brand-green" /> Circuit List
                </h3>

                <div className="space-y-3">
                  {selectedWorkout.exercises.map((ex: any, i: number) => (
                    <div key={i} className="flex items-center p-4 rounded-2xl border border-slate-100 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all group">
                       <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm mr-4 group-hover:bg-brand-green group-hover:text-white transition-colors flex-shrink-0">
                         {i + 1}
                       </div>
                       <div className="flex-grow">
                         <span className="text-base font-bold text-slate-800 block">{ex.name}</span>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{ex.reps}</span>
                       </div>
                       <div className="ml-auto">
                         <input type="checkbox" className="w-6 h-6 rounded-md border-slate-300 text-brand-green focus:ring-brand-green cursor-pointer" />
                       </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
                  <Info className="text-blue-500 shrink-0 mt-1" size={20} />
                  <p className="text-sm text-blue-800 leading-relaxed font-medium">
                    <strong>Pro Tip:</strong> Focus on form over speed. Complete 3 rounds for maximum effectiveness. Rest 60s between rounds.
                  </p>
                </div>

                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => setSelectedWorkout(null)}
                    className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-brand-green transition-colors shadow-lg active:scale-95"
                  >
                    Close
                  </button>
                  <Link 
                    to="/plan"
                    className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-2xl hover:border-slate-900 transition-colors flex items-center justify-center"
                  >
                    View Plan <ChevronRight size={16} className="ml-2"/>
                  </Link>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;