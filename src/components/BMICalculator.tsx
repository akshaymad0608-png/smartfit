import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && height) {
      const w = parseFloat(weight);
      const h = parseFloat(height) / 100; // convert cm to m
      const calculatedBmi = w / (h * h);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) setCategory('Underweight');
      else if (calculatedBmi < 25) setCategory('Normal weight');
      else if (calculatedBmi < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <div className="bg-brand-surface py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-card rounded-[2.5rem] shadow-card border border-brand-gray/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="relative z-10 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-darkGreen mb-4 font-heading">BMI Calculator</h2>
            <p className="text-brand-gray text-lg">Check your Body Mass Index to understand your health status.</p>
          </div>

          <form onSubmit={calculateBMI} className="max-w-md mx-auto space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-darkGreen uppercase tracking-wide">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  className="w-full px-5 py-4 rounded-2xl border border-brand-gray/10 bg-brand-surface focus:bg-brand-card focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-medium text-brand-darkGreen text-center text-xl" 
                  placeholder="0" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-darkGreen uppercase tracking-wide">Height (cm)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  className="w-full px-5 py-4 rounded-2xl border border-brand-gray/10 bg-brand-surface focus:bg-brand-card focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-medium text-brand-darkGreen text-center text-xl" 
                  placeholder="0" 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl hover:bg-brand-blue transition-all shadow-lg shadow-brand-green/20 transform active:scale-95 duration-200 flex items-center justify-center gap-2">
              <Activity size={20} /> Calculate BMI
            </button>
          </form>

          {bmi !== null && (
            <div className="mt-10 p-8 bg-brand-surface rounded-3xl border border-brand-gray/10 text-center animate-fade-in-up">
              <p className="text-brand-gray font-medium mb-2 uppercase tracking-wide text-sm">Your BMI is</p>
              <div className="text-5xl font-bold text-brand-darkGreen mb-4 font-heading">{bmi.toFixed(1)}</div>
              <div className={`inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
                category === 'Normal weight' ? 'bg-green-900/20 text-green-300' : 
                category === 'Underweight' ? 'bg-blue-900/20 text-blue-300' : 
                'bg-orange-900/20 text-orange-300'
              }`}>
                {category}
              </div>
              <p className="mt-6 text-brand-gray text-sm max-w-xs mx-auto flex items-center justify-center gap-2">
                <Info size={16} /> BMI is a screening tool, not a diagnostic of body fatness or health.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
