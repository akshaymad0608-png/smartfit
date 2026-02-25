import React, { useState } from 'react';
import { Utensils, Flame, Check } from 'lucide-react';
import SEO from '../components/SEO';

const Diet: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('Balanced');

  const plans = [
    {
      name: 'Balanced',
      description: 'A mix of macronutrients for sustained energy.',
      calories: '2000 kcal',
      meals: [
        { name: 'Breakfast', items: ['Oatmeal with berries', 'Greek yogurt', 'Black coffee'] },
        { name: 'Lunch', items: ['Grilled chicken salad', 'Quinoa', 'Avocado'] },
        { name: 'Dinner', items: ['Salmon with asparagus', 'Brown rice', 'Herbal tea'] },
        { name: 'Snacks', items: ['Almonds', 'Apple', 'Protein shake'] }
      ]
    },
    {
      name: 'Low Carb',
      description: 'Focus on protein and healthy fats to reduce insulin spikes.',
      calories: '1800 kcal',
      meals: [
        { name: 'Breakfast', items: ['Scrambled eggs with spinach', 'Bacon', 'Avocado'] },
        { name: 'Lunch', items: ['Turkey lettuce wraps', 'Cheese stick', 'Cucumber slices'] },
        { name: 'Dinner', items: ['Steak with broccoli', 'Cauliflower rice', 'Butter'] },
        { name: 'Snacks', items: ['Macadamia nuts', 'Hard boiled egg', 'Beef jerky'] }
      ]
    },
    {
      name: 'Vegan',
      description: 'Plant-based nutrition for a clean and ethical lifestyle.',
      calories: '1900 kcal',
      meals: [
        { name: 'Breakfast', items: ['Tofu scramble', 'Whole wheat toast', 'Orange juice'] },
        { name: 'Lunch', items: ['Lentil soup', 'Mixed green salad', 'Hummus'] },
        { name: 'Dinner', items: ['Chickpea curry', 'Basmati rice', 'Naan bread'] },
        { name: 'Snacks', items: ['Carrot sticks', 'Peanut butter', 'Banana'] }
      ]
    }
  ];

  const currentPlan = plans.find(p => p.name === selectedPlan);

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Diet Plans - SmartFit Nutrition" 
        description="Explore our curated diet plans designed for weight loss and health." 
        keywords="diet plans, nutrition, healthy eating, meal prep"
      />

      {/* Hero */}
      <div className="bg-brand-surface pt-32 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-heading animate-fade-in-up">Nutrition Plans</h1>
          <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Fuel your body with the right nutrients to reach your goals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Plan Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {plans.map((plan) => (
            <button
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-sm ${
                selectedPlan === plan.name 
                  ? 'bg-brand-green text-white shadow-brand-green/30 shadow-lg transform -translate-y-1' 
                  : 'bg-brand-card text-brand-gray hover:bg-brand-surface hover:text-brand-darkGreen'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* Plan Details */}
        {currentPlan && (
          <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Overview Card */}
            <div className="md:col-span-1 bg-brand-card rounded-[2.5rem] p-8 shadow-card border border-brand-gray/5 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-brand-darkGreen mb-4 font-heading">{currentPlan.name} Plan</h2>
                <p className="text-brand-gray text-lg mb-8 leading-relaxed">{currentPlan.description}</p>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-surface rounded-full flex items-center justify-center text-brand-accent">
                    <Flame size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-gray uppercase tracking-wide">Daily Calories</p>
                    <p className="text-xl font-bold text-brand-darkGreen">{currentPlan.calories}</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-brand-darkGreen text-white font-bold py-4 rounded-2xl hover:bg-brand-green transition-all shadow-lg shadow-brand-darkGreen/20">
                Download Meal Plan
              </button>
            </div>

            {/* Meals Grid */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {currentPlan.meals.map((meal, idx) => (
                <div key={idx} className="bg-brand-card rounded-[2rem] p-8 shadow-sm border border-brand-gray/5 hover:shadow-card transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center text-brand-green">
                      <Utensils size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-darkGreen font-heading">{meal.name}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {meal.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-brand-gray font-medium">
                        <Check size={16} className="text-brand-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diet;
