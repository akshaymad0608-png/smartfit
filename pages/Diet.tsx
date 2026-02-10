import React, { useState } from 'react';
import { Coffee, Sun, Moon, Utensils, Info, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

type DietType = 'indian_veg' | 'indian_nonveg' | 'global';

const Diet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DietType>('indian_veg');

  const plans = {
    indian_veg: {
      name: "Indian Vegetarian",
      description: "Balanced plant-based plan focusing on lentils & veggies.",
      meals: {
        breakfast: ["Poha with veggies & peanuts", "Oats Upma with carrots & peas", "2 Moong Dal Chillas + Mint Chutney"],
        lunch: ["1 Roti + 1 bowl Dal Tadka + Salad", "Brown Rice (1 cup) + Rajma + Cucumber Raita", "2 Multigrain Rotis + Palak Paneer"],
        snack: ["Green Tea + 5 Almonds", "Roasted Makhana (1 cup)", "Fruit Salad (Papaya/Watermelon)"],
        dinner: ["Bottle Gourd (Lauki) Soup + 1 Roti", "Khichdi with veggies (light portion)", "Sautéed Paneer & Broccoli Salad"]
      }
    },
    indian_nonveg: {
      name: "Indian Non-Vegetarian",
      description: "High protein plan utilizing eggs and chicken.",
      meals: {
        breakfast: ["2 Boiled Eggs + Toast", "Chicken Keema Sandwich", "Masala Omelette (2 eggs) + veggies"],
        lunch: ["1 Roti + Chicken Curry + Salad", "Fish Curry + Brown Rice + Raita", "Egg Bhurji + 2 Rotis + Dal"],
        snack: ["Boiled Egg Whites (2)", "Black Coffee + Walnuts", "Protein Shake (Water base)"],
        dinner: ["Grilled Chicken Breast + Veggies", "Chicken Clear Soup + Salad", "Egg Curry (Low oil) + 1 Roti"]
      }
    },
    global: {
      name: "Global Simple",
      description: "Easy-to-cook whole foods and lean proteins.",
      meals: {
        breakfast: ["Oatmeal with berries & chia", "Scrambled Eggs on Avocado Toast", "Greek Yogurt with Honey"],
        lunch: ["Grilled Chicken Salad", "Quinoa Bowl with Chickpeas", "Tuna Sandwich (Whole grain)"],
        snack: ["Apple with Peanut Butter", "Carrot sticks with Hummus", "Handful of Mixed Nuts"],
        dinner: ["Baked Salmon with Asparagus", "Stir-fry Tofu with mixed veg", "Veg Soup + Grilled Turkey"]
      }
    }
  };

  const currentPlan = plans[activeTab];

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Diet Plans - Healthy Weight Loss Plan Recipes" 
        description="Free weight loss diet plans. Indian Vegetarian, Non-Vegetarian, and Global options with breakfast, lunch, and dinner ideas." 
        keywords="diet plan, indian weight loss diet, vegetarian diet plan, healthy meal ideas, weight loss plan"
      />

      {/* Hero Section */}
      <div className="bg-brand-green/5 pt-32 pb-32 text-center text-brand-darkGreen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-darkGreen/10 bg-white text-sm font-bold mb-6 text-brand-green shadow-sm">Nutrition Plans</div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight font-heading">Eat Smart, <span className="text-brand-green">Lose Weight</span></h1>
          <p className="text-xl md:text-2xl text-brand-darkGreen/70 font-medium max-w-2xl mx-auto">80% of weight loss happens in the kitchen.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20 relative z-10">
        
        {/* Healthy Plate Visual Concept */}
        <div className="mb-24">
          <div className="text-center mb-16">
             <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm text-sm font-bold text-slate-500 mb-6">The Methodology</div>
            <h2 className="text-4xl font-bold text-slate-900">The "Healthy Plate" Method</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">No complex calorie counting needed. Just visualize your plate proportions for every meal.</p>
          </div>
          
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-white flex flex-col lg:flex-row items-center justify-center gap-16 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-slate-50 opacity-50 z-0"></div>
            
            {/* Visual Plate */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0 z-10 drop-shadow-2xl">
               <div className="absolute inset-0 rounded-full border-[8px] border-white bg-white overflow-hidden shadow-inner">
                 {/* Veggies 50% */}
                 <div className="absolute inset-0 clip-path-half bg-green-100 flex items-center justify-center group hover:bg-green-200 transition-colors cursor-default">
                    <span className="font-bold text-green-800 text-xl transform -translate-y-10 text-center">50%<br/><span className="text-xs uppercase tracking-wide opacity-70">Vegetables</span></span>
                 </div>
                 {/* Protein 25% */}
                 <div className="absolute inset-0 clip-path-quarter-1 bg-red-100 flex items-end justify-start pb-16 pl-16 group hover:bg-red-200 transition-colors cursor-default">
                    <span className="font-bold text-red-800 text-lg transform translate-y-2 -translate-x-2 text-center">25%<br/><span className="text-[10px] uppercase tracking-wide opacity-70">Protein</span></span>
                 </div>
                 {/* Carbs 25% */}
                 <div className="absolute inset-0 clip-path-quarter-2 bg-yellow-100 flex items-end justify-end pb-16 pr-16 group hover:bg-yellow-200 transition-colors cursor-default">
                    <span className="font-bold text-yellow-800 text-lg transform translate-y-2 translate-x-2 text-center">25%<br/><span className="text-[10px] uppercase tracking-wide opacity-70">Carbs</span></span>
                 </div>
                 
                 {/* Plate Divide Lines */}
                 <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-white z-10"></div>
                 <div className="absolute top-1/2 bottom-0 left-1/2 w-1.5 bg-white z-10"></div>
               </div>
               <style>{`
                 .clip-path-half { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); }
                 .clip-path-quarter-1 { clip-path: polygon(0 50%, 50% 50%, 50% 100%, 0 100%); }
                 .clip-path-quarter-2 { clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%); }
               `}</style>
            </div>

            {/* Legend/Explanation */}
            <div className="grid gap-6 w-full max-w-lg z-10">
               <div className="flex items-start p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-green-100 rounded-2xl mr-5 text-green-700 flex-shrink-0"><CheckCircle2 /></div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Fiber & Vegetables</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">Fill half your plate with salad, stir-fried veggies, or green leafy vegetables. This keeps you full for low calories.</p>
                  </div>
               </div>
               <div className="flex items-start p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-red-100 rounded-2xl mr-5 text-red-700 flex-shrink-0"><CheckCircle2 /></div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Lean Protein</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">Dal, Paneer, Chicken, Eggs, or Fish. Protein boosts metabolism and protects muscle mass during weight loss.</p>
                  </div>
               </div>
               <div className="flex items-start p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-3 bg-yellow-100 rounded-2xl mr-5 text-yellow-700 flex-shrink-0"><CheckCircle2 /></div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Complex Carbs</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">Roti, Rice, Potatoes, or Oats. Essential for energy, but strictly portion controlled.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="flex justify-center mb-12">
            <div className="bg-white p-2 rounded-full shadow-lg border border-slate-100 inline-flex flex-wrap justify-center gap-2">
              {(Object.keys(plans) as DietType[]).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeTab === key
                    ? 'bg-slate-900 text-white shadow-md transform scale-100' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {plans[key].name}
                </button>
              ))}
            </div>
        </div>

        {/* Plan Content */}
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-white">
            <div className="p-10 md:p-14 bg-gradient-to-br from-emerald-50 to-white border-b border-slate-100 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 flex items-center justify-center gap-4">
                <Utensils className="text-emerald-500" size={32} /> {currentPlan.name}
              </h2>
              <p className="text-slate-600 mt-4 text-xl max-w-2xl mx-auto leading-relaxed">{currentPlan.description}</p>
            </div>

            <div className="divide-y divide-slate-50">
              {/* Meal Rows */}
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 hover:bg-slate-50/80 transition-colors group">
                <div className="w-40 flex-shrink-0 flex items-center gap-4 text-slate-900 font-bold text-lg">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Coffee size={24} /></div> Breakfast
                </div>
                <ul className="space-y-4 flex-grow">
                  {currentPlan.meals.breakfast.map((item, i) => (
                    <li key={i} className="flex items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-slate-700 text-base font-medium">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mr-4 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 hover:bg-slate-50/80 transition-colors group">
                <div className="w-40 flex-shrink-0 flex items-center gap-4 text-slate-900 font-bold text-lg">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Sun size={24} /></div> Lunch
                </div>
                <ul className="space-y-4 flex-grow">
                  {currentPlan.meals.lunch.map((item, i) => (
                    <li key={i} className="flex items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-slate-700 text-base font-medium">
                       <div className="w-2 h-2 rounded-full bg-emerald-400 mr-4 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 hover:bg-slate-50/80 transition-colors group">
                <div className="w-40 flex-shrink-0 flex items-center gap-4 text-slate-900 font-bold text-lg">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Utensils size={24} /></div> Snack
                </div>
                <ul className="space-y-4 flex-grow">
                  {currentPlan.meals.snack.map((item, i) => (
                    <li key={i} className="flex items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-slate-700 text-base font-medium">
                       <div className="w-2 h-2 rounded-full bg-emerald-400 mr-4 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 hover:bg-slate-50/80 transition-colors group">
                <div className="w-40 flex-shrink-0 flex items-center gap-4 text-slate-900 font-bold text-lg">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><Moon size={24} /></div> Dinner
                </div>
                <ul className="space-y-4 flex-grow">
                  {currentPlan.meals.dinner.map((item, i) => (
                    <li key={i} className="flex items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-slate-700 text-base font-medium">
                       <div className="w-2 h-2 rounded-full bg-emerald-400 mr-4 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 items-center shadow-sm">
             <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 shrink-0">
               <Info size={28} />
             </div>
             <div className="text-base text-blue-900 leading-relaxed font-medium">
                <strong>Hydration Tip:</strong> Drink 1 glass of water 30 minutes before every meal. This helps with digestion and reduces overeating by mimicking satiety.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diet;