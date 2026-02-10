import React, { useState } from 'react';
import { Target, Heart, Shield, ArrowRight, X, Quote } from 'lucide-react';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="About Us - SmartFit Weight Loss Plan" 
        description="Learn about our mission to simplify weight loss and meet Akshay Mahajan, the creator behind SmartFit." 
        keywords="about us, fitness creator, weight loss philosophy, weight loss plan"
      />

      <div className="bg-white pt-24 pb-20 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-brand-green font-extrabold uppercase tracking-widest text-xs mb-4 block">Our Philosophy</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">Making Fitness <br/><span className="text-gradient">Human Again.</span></h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            "To make weight loss simple, accessible, and sustainable for everyone, everywhere—without expensive gym memberships or complex diets."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-10">Why SmartFit?</h2>
            <div className="space-y-10">
              <div className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white border border-slate-100 text-brand-green shadow-card group-hover:scale-110 transition-transform">
                    <Target size={32} />
                  </div>
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Focus on Habits, Not Hype</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We don't believe in magic pills. We believe in small, daily changes that compound into massive results over time.
                  </p>
                </div>
              </div>

              <div className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white border border-slate-100 text-brand-blue shadow-card group-hover:scale-110 transition-transform">
                    <Heart size={32} />
                  </div>
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Health First Approach</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Weight loss shouldn't come at the cost of your health. Our plans prioritize nutrition, hormonal health, and mental well-being.
                  </p>
                </div>
              </div>

              <div className="flex group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white border border-slate-100 text-slate-800 shadow-card group-hover:scale-110 transition-transform">
                    <Shield size={32} />
                  </div>
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Science-Backed Methods</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our strategies are based on proven principles of caloric deficit, macronutrient balance, and progressive overload.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-green to-brand-blue opacity-20 rounded-[3rem] transform rotate-3 blur-sm"></div>
             <img 
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1000" 
              alt="Nature representing balance" 
              className="rounded-[3rem] shadow-2xl w-full relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-700 object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 flex flex-col md:flex-row gap-12 items-center text-center md:text-left shadow-2xl relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green opacity-20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
             
             <div className="relative z-10 shrink-0">
               <div className="w-48 h-48 rounded-full p-2 bg-gradient-to-r from-brand-green to-brand-blue">
                 <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
                  alt="Akshay Mahajan" 
                  className="w-full h-full rounded-full object-cover border-4 border-slate-900"
                />
               </div>
             </div>
             
            <div className="relative z-10">
              <h4 className="text-brand-green font-bold uppercase tracking-wider text-sm mb-3">Meet the Creator</h4>
              <h2 className="text-4xl font-black text-white mb-4">Akshay Mahajan</h2>
              <p className="text-slate-400 font-medium mb-6 text-lg">Fitness Content Creator & AI Educator</p>
              <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                Akshay is passionate about simplifying complex fitness concepts. With a background in technology and a personal transformation journey losing 20kg, he uses data-driven approaches to create efficient, no-nonsense weight loss plans.
              </p>
              <button 
                onClick={() => setIsStoryOpen(true)}
                className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-brand-green hover:text-white transition-all inline-flex items-center group cursor-pointer"
              >
                Read Full Story <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Story Modal */}
      {isStoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-brand-green to-teal-700"></div>
            
            <button 
              onClick={() => setIsStoryOpen(false)}
              className="absolute top-6 right-6 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors z-20 backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 px-8 pt-12 pb-6 flex-shrink-0">
               <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-xl mb-6 rotate-3">
                 <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" 
                    className="w-full h-full object-cover rounded-xl"
                 />
               </div>
               <h2 className="text-3xl font-black text-slate-900 font-heading">My 20kg Weight Loss Journey</h2>
               <p className="text-slate-500 font-medium mt-2">From "I don't have time" to "It's a lifestyle".</p>
            </div>

            <div className="px-8 pb-10 overflow-y-auto custom-scrollbar">
               <div className="prose prose-lg text-slate-600">
                  <p className="lead font-medium text-slate-800">
                    In 2018, I hit my heaviest weight: 95kg. I was working 12 hours a day as a developer, eating takeout for every meal, and my idea of exercise was walking to the fridge.
                  </p>
                  
                  <div className="my-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4">
                    <Quote className="text-brand-green flex-shrink-0" size={32} />
                    <p className="italic text-slate-700 m-0">
                      "I tried keto, intermittent fasting, juice cleanses... I'd lose 2kg and gain back 4kg. I was stuck in a loop of restriction and bingeing."
                    </p>
                  </div>

                  <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">The Turning Point</h3>
                  <p>
                    One day, I couldn't tie my shoelaces without getting winded. That was it. I stopped looking for "hacks" and started looking at the science. I realized weight loss isn't about suffering; it's about math and biology.
                  </p>

                  <h3 className="font-bold text-slate-900 text-xl mt-8 mb-4">What Actually Worked</h3>
                  <ul className="space-y-3 list-none pl-0">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-1">1</div>
                      <span><strong>Caloric Deficit:</strong> I stopped guessing portions and started tracking.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-1">2</div>
                      <span><strong>Protein Priority:</strong> I made sure to eat 100g of protein daily to save my muscles.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-1">3</div>
                      <span><strong>Walking:</strong> I didn't join a gym for the first 3 months. I just walked 8k steps.</span>
                    </li>
                  </ul>

                  <p className="mt-8">
                    It took me 8 months to lose 20kg. No magic. Just consistency. That's why I built <strong>SmartFit</strong>—to give you the roadmap I wish I had.
                  </p>
               </div>
               
               <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => setIsStoryOpen(false)}
                    className="bg-brand-darkGreen text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-green transition-all shadow-lg active:scale-95"
                  >
                    Close Story
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;