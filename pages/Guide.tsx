import React from 'react';
import { Flame, AlertTriangle, Info, Brain, Activity, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const Guide: React.FC = () => {
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Weight Loss 101: The Science Behind Weight Loss",
    "description": "Understand the science of weight loss: calories, metabolism, myths, and common mistakes.",
    "author": {
      "@type": "Organization",
      "name": "SmartFit"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SmartFit",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smartweightlossblueprint.com/logo.png"
      }
    }
  };

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Weight Loss Guide - The Science Behind Weight Loss Plans" 
        description="Understand the science of weight loss: calories, metabolism, myths, and common mistakes." 
        keywords="calories, metabolism, weight loss myths, beginner guide, weight loss plan"
        schema={guideSchema}
      />

      <div className="bg-brand-green/5 pt-32 pb-32 text-center text-brand-darkGreen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-darkGreen/10 bg-white text-sm font-bold mb-6 text-brand-green shadow-sm">Master Class</div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-heading">Weight Loss 101</h1>
          <p className="text-xl md:text-2xl text-brand-darkGreen/70 font-medium max-w-2xl mx-auto">The science explained simply. No jargon. No bs.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-20 space-y-20">
        
        {/* Section 1: Calories */}
        <section id="calories" className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-slate-100">
          <div className="flex items-center gap-6 mb-10 border-b border-slate-100 pb-8">
            <div className="p-5 bg-orange-50 text-orange-500 rounded-2xl shadow-sm">
              <Flame size={40} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">How It Actually Works</h2>
              <p className="text-slate-500 mt-2 text-lg">The physics of burning fat</p>
            </div>
          </div>
          
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p className="mb-8 leading-relaxed text-xl font-light">
              At its core, weight loss is a math problem dictated by <strong>Energy Balance</strong>. It's not about "good" or "bad" foods, but about energy in vs. energy out.
            </p>
            
            <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl my-10 flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-white p-4 rounded-full shadow-sm text-orange-500 shrink-0">
                <Brain size={32} />
              </div>
              <div>
                <h3 className="font-bold text-orange-900 text-xl mb-2">The Golden Rule: Caloric Deficit</h3>
                <p className="text-orange-800 leading-relaxed">
                  To lose weight, you must consume fewer calories than your body burns. This deficit forces your body to tap into stored fat for energy.
                </p>
              </div>
            </div>
            
            <h4 className="font-bold text-slate-900 text-2xl mt-12 mb-6">Where do calories go?</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                 <div className="mb-3 mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400"><Activity size={20} /></div>
                 <strong className="block text-2xl text-slate-900 mb-1">70%</strong>
                 <span className="text-sm font-bold uppercase tracking-wider text-slate-500">BMR (Alive)</span>
               </div>
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                 <div className="mb-3 mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400"><Clock size={20} /></div>
                 <strong className="block text-2xl text-slate-900 mb-1">15%</strong>
                 <span className="text-sm font-bold uppercase tracking-wider text-slate-500">NEAT (Walking)</span>
               </div>
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center hover:shadow-md transition-shadow">
                 <div className="mb-3 mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400"><Flame size={20} /></div>
                 <strong className="block text-2xl text-slate-900 mb-1">10%</strong>
                 <span className="text-sm font-bold uppercase tracking-wider text-slate-500">TEF (Digestion)</span>
               </div>
               <div className="p-6 bg-brand-green/10 rounded-3xl border border-brand-green/20 text-center">
                 <div className="mb-3 mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-green"><Activity size={20} /></div>
                 <strong className="block text-2xl text-brand-darkGreen mb-1">5%</strong>
                 <span className="text-sm font-bold uppercase tracking-wider text-brand-darkGreen">Exercise</span>
               </div>
            </div>
            <p className="mt-8 text-center text-slate-500 font-medium">
              *Notice how Exercise is the smallest part? That's why you can't out-train a bad diet.
            </p>
          </div>
        </section>

        {/* Section 2: Mistakes */}
        <section id="mistakes" className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-red-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
          
          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="p-5 bg-red-50 text-red-500 rounded-2xl">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">5 Beginner Mistakes</h2>
              <p className="text-slate-500 mt-2 text-lg">Avoid these pitfalls to see results</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {[
              { title: 'Spot Reduction Myth', desc: "You cannot burn fat only from your belly by doing crunches. Fat loss happens systemically." },
              { title: 'Extreme Starvation', desc: "Eating too little slows metabolism and causes muscle loss. Aim for a moderate deficit (300-500 kcal)." },
              { title: 'Drinking Calories', desc: "Juices and sugary coffees are calorie bombs. Switch to water, black coffee, or tea." },
              { title: 'Ignoring Protein', desc: "Protein keeps you full and protects muscle. Aim for 0.8g per kg of body weight." },
              { title: 'Scale Obsession', desc: "Weight fluctuates daily due to water retention. Use photos and clothes fit as better progress markers." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xl mb-2">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Myths */}
        <section id="myths" className="pb-12">
          <div className="flex items-center gap-6 mb-12 justify-center">
             <div className="p-4 bg-brand-blue/10 text-brand-blue rounded-2xl">
              <Info size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Busting Myths</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { myth: "Carbs make you fat", fact: "Excess calories make you fat. You can eat carbs and lose weight in a deficit." },
              { myth: "Sweating = Fat Loss", fact: "Sweat is water loss for cooling. It doesn't correlate to fat burned." },
              { myth: "Detox teas work", fact: "Your liver and kidneys detox you 24/7. Teas are mostly laxatives." },
              { myth: "Eating at night causes gain", fact: "Meal timing matters less than total daily intake." }
            ].map((item, i) => (
               <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-red-500 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">Myth</span>
                  <h3 className="text-lg font-bold text-slate-900">{item.myth}</h3>
                </div>
                
                <div className="pl-4 border-l-2 border-brand-green/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-brand-green font-bold text-xs uppercase tracking-wider">Fact</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {item.fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Guide;