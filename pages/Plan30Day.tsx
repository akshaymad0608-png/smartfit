import React, { useState, useEffect } from 'react';
import { Calendar, Check, Dumbbell, Apple, Award, Trophy, ChevronRight, RotateCcw, Flame, X, Zap, Target, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface DayData {
  day: number;
  workoutTitle: string;
  workoutDesc: string;
  dietTitle: string;
  dietDesc: string;
  status: 'pending' | 'completed' | 'active';
}

const Plan30Day: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  
  // Initialize from localStorage
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    const saved = localStorage.getItem('smartfit_completed_days');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smartfit_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  const toggleDay = (day: number) => {
    if (completedDays.includes(day)) {
      setCompletedDays(completedDays.filter(d => d !== day));
    } else {
      setCompletedDays([...completedDays, day]);
    }
  };

  const resetProgress = () => {
    if (confirm("Are you sure you want to reset your entire progress? This cannot be undone.")) {
      setCompletedDays([]);
      setActiveWeek(1);
    }
  };

  // Calculate Streak
  const currentStreak = (() => {
    let streak = 0;
    const sorted = [...completedDays].sort((a, b) => b - a); // Descending
    if (sorted.length === 0) return 0;

    // This is a simplified streak assuming the last completed day was "today" or "yesterday" relative to the plan progress
    // For a real app, we'd check dates. Here we just count consecutive numbers backwards from the highest.
    let current = sorted[0];
    streak = 1;
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === current - 1) {
            streak++;
            current = sorted[i];
        } else {
            break;
        }
    }
    return streak;
  })();

  const generateWeek = (weekNum: number): DayData[] => {
    const startDay = (weekNum - 1) * 7 + 1;
    return Array.from({ length: 7 }, (_, i) => {
      const day = startDay + i;
      
      // Keep within 30 days
      if (day > 30) return null;

      const mod = day % 7;
      let workoutTitle = "Active Recovery";
      let workoutDesc = "Go for a 45-minute brisk walk or light yoga session.";
      let dietTitle = "Hydration Focus";
      let dietDesc = "Drink 3-4 liters of water. Avoid sugary drinks completely.";

      switch (mod) {
        case 1: // Monday
          workoutTitle = "Upper Body Strength";
          workoutDesc = "Pushups (3x12), Shoulder Taps (3x20), Tricep Dips (3x15).";
          dietTitle = "High Protein Kickstart";
          dietDesc = "Ensure protein in every meal. Eggs for breakfast, lentils/chicken for lunch & dinner.";
          break;
        case 2: // Tuesday
          workoutTitle = "HIIT Cardio Blast";
          workoutDesc = "20 mins: 30s Jumping Jacks, 30s High Knees, 30s Rest. Repeat.";
          dietTitle = "Complex Carbs";
          dietDesc = "Fuel your cardio with oats, brown rice, or sweet potatoes. Avoid white bread.";
          break;
        case 3: // Wednesday
          workoutTitle = "Lower Body Tone";
          workoutDesc = "Squats (3x20), Lunges (3x12/leg), Glute Bridges (3x15).";
          dietTitle = "Green Veggie Overload";
          dietDesc = "Fill 50% of your plate with green vegetables (Spinach, Broccoli, Beans).";
          break;
        case 4: // Thursday
          workoutTitle = "Core & Abs";
          workoutDesc = "Plank (3x45s), Russian Twists (3x20), Leg Raises (3x15).";
          dietTitle = "No Sugar Day";
          dietDesc = "Zero added sugar today. Satisfy cravings with a piece of fruit.";
          break;
        case 5: // Friday
          workoutTitle = "Full Body Circuit";
          workoutDesc = "Burpees (3x10), Mountain Climbers (3x20), Pushups (3x10), Squats (3x15).";
          dietTitle = "Healthy Fats";
          dietDesc = "Include nuts, seeds, or avocado. Cook with minimal oil/ghee.";
          break;
        case 6: // Saturday
          workoutTitle = "Yoga & Stretch";
          workoutDesc = "30 mins of Sun Salutations and deep stretching for recovery.";
          dietTitle = "Light Dinner";
          dietDesc = "Finish dinner by 8 PM. Keep it light - Soup or Salad.";
          break;
        case 0: // Sunday
          workoutTitle = "Rest Day";
          workoutDesc = "Rest completely to let muscles recover. Meal prep for next week.";
          dietTitle = "Cheat Meal (Optional)";
          dietDesc = "Enjoy one moderate cheat meal, but get right back on track.";
          break;
      }

      // Special overrides for Week 4 (Intensity)
      if (weekNum === 4 && mod !== 0 && mod !== 6) {
         workoutDesc = "Double intensity! Add 1 extra set to all exercises.";
      }

      return { 
        day, 
        workoutTitle, 
        workoutDesc, 
        dietTitle, 
        dietDesc, 
        status: completedDays.includes(day) ? 'completed' : 'pending' 
      };
    }).filter(Boolean) as DayData[];
  };

  const currentWeekData = generateWeek(activeWeek);
  const progressPercentage = Math.round((completedDays.length / 30) * 100);

  const handlePrint = () => {
    window.print();
  };

  const planSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "30-Day Weight Loss Challenge",
    "description": "A structured 30-day weight loss plan combining daily workouts and diet goals.",
    "totalTime": "P30D",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Week 1: The Kickstart",
        "text": "Establish the routine. Focus on form."
      },
      {
        "@type": "HowToStep",
        "name": "Week 2: Momentum",
        "text": "Increase intensity. Minimize rest."
      },
      {
        "@type": "HowToStep",
        "name": "Week 3: Discipline",
        "text": "Strict Diet. No cheat meals."
      },
      {
        "@type": "HowToStep",
        "name": "Week 4: Intensity",
        "text": "Max effort. Empty the tank."
      }
    ]
  };

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface min-h-screen">
      <SEO 
        title="30-Day Weight Loss Challenge - Monthly Weight Loss Plan" 
        description="A structured 30-day weight loss plan combining daily workouts and diet goals to help you lose fat and build habits." 
        keywords="30 day weight loss challenge, monthly workout plan, fat loss schedule, weight loss plan"
        schema={planSchema}
      />

      {/* Hero Header */}
      <div className="bg-brand-green/5 pt-32 pb-48 text-center text-brand-darkGreen relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200 bg-white text-sm font-bold mb-6 text-purple-700 shadow-sm">
             <Trophy size={14} className="text-purple-600" /> 
             Monthly Blueprint
           </div>
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-heading">30-Day Challenge</h1>
           <p className="text-xl md:text-2xl text-brand-darkGreen/70 font-medium max-w-2xl mx-auto">Build consistency. See results. One day at a time.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 print:mt-10 print:px-0">
        
        {/* Progress Dashboard */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 mb-12 border border-slate-100 print:hidden relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl -z-10 opacity-50"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Stats */}
            <div className="flex items-center gap-8 w-full lg:w-auto">
              <div className="relative">
                <div className="w-28 h-28 rounded-[2rem] bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200 flex-shrink-0 relative z-10">
                  <div className="text-center">
                    <span className="block text-4xl font-black leading-none">{completedDays.length}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Days Done</span>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-[2.2rem] blur opacity-20 z-0"></div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-3xl font-heading">Your Journey</h3>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                      <Flame size={18} className="text-orange-500 fill-orange-500" />
                      <span className="font-bold text-orange-700 text-sm">{currentStreak} Day Streak</span>
                   </div>
                   {progressPercentage >= 50 && (
                     <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <Target size={18} className="text-green-600" />
                        <span className="font-bold text-green-700 text-sm">Halfway There!</span>
                     </div>
                   )}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="flex-grow w-full lg:max-w-xl bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="flex justify-between text-sm font-bold mb-3 uppercase tracking-wider">
                <span className="text-slate-900 flex items-center gap-2">Overall Progress <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-xs">{progressPercentage}%</span></span>
                <button onClick={resetProgress} className="text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors text-xs">
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-brand-green to-teal-500 h-full rounded-full transition-all duration-1000 ease-out relative" 
                  style={{ width: `${Math.max(2, progressPercentage)}%` }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 font-medium text-center">
                 {30 - completedDays.length} days remaining to reach your goal.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 print:block">
          
          {/* Week Selector Sidebar */}
          <div className="lg:col-span-3 space-y-6 print:hidden">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 sticky top-24">
               <h3 className="font-bold text-slate-900 mb-6 px-2 text-xl font-heading">Phases</h3>
               <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((week) => (
                  <button
                    key={week}
                    onClick={() => setActiveWeek(week)}
                    className={`w-full p-4 rounded-2xl font-bold flex items-center justify-between transition-all duration-300 group text-left relative overflow-hidden ${
                      activeWeek === week
                        ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="relative z-10">
                      <span className="text-xs uppercase tracking-wider opacity-60 block mb-1">Week {week}</span>
                      <span className="text-sm font-bold">
                        {week === 1 && "The Kickstart"}
                        {week === 2 && "Momentum"}
                        {week === 3 && "Discipline"}
                        {week === 4 && "Intensity"}
                        {week === 5 && "Bonus"}
                      </span>
                    </div>
                    {activeWeek === week && <ChevronRight size={20} className="relative z-10" />}
                  </button>
                ))}
               </div>
               
               <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center text-sm"><Award className="mr-2" size={16}/> Week {activeWeek} Goal</h4>
                    <p className="text-xs text-purple-800 leading-relaxed font-medium">
                      {activeWeek === 1 && "Establish the routine. Focus on form."}
                      {activeWeek === 2 && "Increase intensity. Minimize rest."}
                      {activeWeek === 3 && "Strict Diet. No cheat meals."}
                      {activeWeek === 4 && "Max effort. Empty the tank."}
                      {activeWeek === 5 && "Active recovery & maintenance."}
                    </p>
                  </div>
               </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="lg:col-span-9 print:w-full">
             <div className="hidden print:block mb-8">
               <h2 className="text-2xl font-bold mb-2 font-heading">My 30-Day Weight Loss Plan - Week {activeWeek}</h2>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
              {currentWeekData.map((data) => {
                const isCompleted = completedDays.includes(data.day);
                return (
                  <div 
                    key={data.day} 
                    onClick={() => setSelectedDay(data)}
                    className={`relative rounded-[2rem] p-6 border-2 transition-all duration-300 cursor-pointer group flex flex-col h-full print:border-slate-300 print:break-inside-avoid ${
                      isCompleted 
                        ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-green-900/10' 
                        : 'bg-white border-transparent hover:border-brand-green/30 shadow-sm hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-lg ${
                        isCompleted ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        Day {data.day}
                      </span>
                      <div className={`rounded-full p-1.5 ${isCompleted ? 'bg-white text-brand-green' : 'bg-slate-100 text-slate-300'}`}>
                        {isCompleted ? <Check size={14} strokeWidth={4} /> : <div className="w-3.5 h-3.5"></div>}
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-grow">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Dumbbell size={16} className={isCompleted ? 'text-white/80' : 'text-brand-blue'} />
                          <p className={`text-[10px] font-bold uppercase tracking-wide opacity-70`}>Workout</p>
                        </div>
                        <p className={`font-bold text-lg leading-tight ${isCompleted ? 'text-white' : 'text-slate-800'}`}>{data.workoutTitle}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Apple size={16} className={isCompleted ? 'text-white/80' : 'text-orange-500'} />
                          <p className={`text-[10px] font-bold uppercase tracking-wide opacity-70`}>Diet</p>
                        </div>
                        <p className={`font-bold text-sm ${isCompleted ? 'text-white/90' : 'text-slate-600'}`}>{data.dietTitle}</p>
                      </div>
                    </div>

                    <div className={`mt-6 pt-4 border-t ${isCompleted ? 'border-white/20' : 'border-slate-100'} flex justify-between items-center print:hidden`}>
                        <span className={`text-xs font-bold ${isCompleted ? 'text-white/80' : 'text-brand-green'}`}>View Details</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isCompleted ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-brand-green group-hover:text-white'}`}>
                           <ArrowRight size={14} />
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-slate-900 rounded-[2.5rem] p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden print:hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green rounded-full blur-[80px] opacity-20"></div>
              <div className="relative z-10 text-center md:text-left">
                <h3 className="font-bold text-2xl mb-2 font-heading">Print Your Calendar</h3>
                <p className="text-slate-400">Stick it on your fridge. Cross off the days manually.</p>
              </div>
              <button 
                onClick={handlePrint}
                className="relative z-10 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-brand-green hover:text-white transition-all shadow-lg inline-flex items-center whitespace-nowrap transform hover:-translate-y-1"
              >
                <Calendar className="mr-2" size={18} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DAY DETAIL MODAL */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl relative overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="bg-slate-900 p-8 text-white relative overflow-hidden shrink-0">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green rounded-full blur-[50px] opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
                 <button 
                   onClick={() => setSelectedDay(null)}
                   className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
                 >
                   <X size={20} />
                 </button>
                 
                 <div className="relative z-10">
                    <span className="inline-block py-1 px-3 rounded-lg bg-brand-green text-xs font-bold uppercase tracking-wider mb-3">
                      Day {selectedDay.day}
                    </span>
                    <h2 className="text-3xl font-black font-heading leading-tight">{selectedDay.workoutTitle}</h2>
                 </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto">
                 <div className="space-y-8">
                    {/* Workout Section */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                       <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                             <Dumbbell size={20} />
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg">Workout Plan</h3>
                       </div>
                       <p className="text-slate-600 leading-relaxed font-medium">
                          {selectedDay.workoutDesc}
                       </p>
                       <div className="mt-4 flex gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">45 Mins</span>
                          <span className="text-[10px] font-bold uppercase tracking-wide bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">Medium Intensity</span>
                       </div>
                    </div>

                    {/* Diet Section */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                       <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
                             <Apple size={20} />
                          </div>
                          <h3 className="font-bold text-slate-900 text-lg">Diet Focus: {selectedDay.dietTitle}</h3>
                       </div>
                       <p className="text-slate-600 leading-relaxed font-medium">
                          {selectedDay.dietDesc}
                       </p>
                    </div>
                    
                    {/* Action Button */}
                    <button 
                      onClick={() => {
                        toggleDay(selectedDay.day);
                        setSelectedDay(prev => prev ? {...prev, status: prev.status === 'completed' ? 'pending' : 'completed'} : null);
                        // Optional: Close modal after completion or keep open to show status
                        // setSelectedDay(null); 
                      }}
                      className={`w-full py-5 rounded-2xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
                        completedDays.includes(selectedDay.day)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-brand-green text-white hover:bg-slate-900'
                      }`}
                    >
                      {completedDays.includes(selectedDay.day) ? (
                        <><Check size={24} /> Day Completed</>
                      ) : (
                        <><Zap size={24} /> Mark as Complete</>
                      )}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Plan30Day;