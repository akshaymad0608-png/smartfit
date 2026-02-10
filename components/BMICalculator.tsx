import React, { useState } from 'react';
import { Calculator, RefreshCw, AlertCircle, ChevronDown } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Metric Inputs
  const [weightMetric, setWeightMetric] = useState<string>('');
  const [heightMetric, setHeightMetric] = useState<string>('');

  // Imperial Inputs
  const [weightImperial, setWeightImperial] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');

  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    if (unit !== newUnit) {
      setUnit(newUnit);
      setError('');
      setBmi(null);
      setStatus('');
    }
  };

  const calculateBMI = () => {
    setError('');
    let calculatedBmi = 0;

    if (unit === 'metric') {
      const w = parseFloat(weightMetric);
      const h = parseFloat(heightMetric);

      if (!w || !h || w <= 0 || h <= 0) {
        setError('Please enter valid positive values.');
        return;
      }

      // BMI = kg / m^2
      calculatedBmi = w / ((h / 100) * (h / 100));
    } else {
      const w = parseFloat(weightImperial);
      const ft = parseFloat(heightFeet || '0');
      const inc = parseFloat(heightInches || '0');

      if (!w || w <= 0) {
        setError('Please enter a valid weight.');
        return;
      }

      const totalInches = (ft * 12) + inc;
      if (totalInches <= 0) {
        setError('Please enter a valid height.');
        return;
      }

      // BMI = (lbs / in^2) * 703
      calculatedBmi = (703 * w) / (totalInches * totalInches);
    }

    const finalBmi = parseFloat(calculatedBmi.toFixed(1));
    setBmi(finalBmi);
    
    if (finalBmi < 18.5) setStatus('Underweight');
    else if (finalBmi < 25) setStatus('Normal weight');
    else if (finalBmi < 30) setStatus('Overweight');
    else setStatus('Obese');
  };

  const reset = () => {
    setWeightMetric('');
    setHeightMetric('');
    setWeightImperial('');
    setHeightFeet('');
    setHeightInches('');
    setBmi(null);
    setStatus('');
    setError('');
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'Normal weight': return 'text-green-600 bg-green-50 border-green-200';
      case 'Underweight': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Overweight': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Obese': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Calculate position percentage for the marker (clamped between 0 and 100)
  // Scale: 15 (0%) to 35 (100%)
  const getMarkerPosition = (val: number) => {
    const min = 15;
    const max = 35;
    const pos = ((val - min) / (max - min)) * 100;
    return Math.min(Math.max(pos, 0), 100);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative transition-all duration-300 hover:shadow-2xl">
      <div className="bg-brand-green p-5 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
        <h3 className="text-lg font-bold flex items-center justify-center gap-2 relative z-10 font-heading">
          <Calculator size={20} /> BMI Calculator
        </h3>
        <p className="text-brand-light text-xs mt-1 relative z-10 opacity-90">Check your Body Mass Index</p>
      </div>
      
      <div className="p-5 space-y-4">
        {/* Sliding Unit Toggle */}
        <div className="relative flex bg-gray-100 p-1 rounded-xl cursor-pointer">
          <div 
            className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-transform duration-300 ease-out ${unit === 'imperial' ? 'translate-x-full' : ''}`}
          ></div>
          <button
            onClick={() => handleUnitChange('metric')}
            className={`flex-1 relative z-10 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 ${
              unit === 'metric' ? 'text-brand-green' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => handleUnitChange('imperial')}
            className={`flex-1 relative z-10 py-1.5 rounded-lg text-xs font-bold transition-colors duration-200 ${
              unit === 'imperial' ? 'text-brand-green' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Imperial (lbs/ft)
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-bold p-2.5 rounded-lg flex items-center animate-pulse border border-red-100">
            <AlertCircle size={14} className="mr-2 flex-shrink-0" /> {error}
          </div>
        )}

        {/* Inputs with transition */}
        <div className="relative min-h-[160px]">
          <div className={`transition-all duration-300 absolute inset-0 ${unit === 'metric' ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 -translate-x-10 pointer-events-none'}`}>
             <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightMetric}
                  onChange={(e) => setWeightMetric(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-semibold text-sm"
                  placeholder="e.g. 70"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightMetric}
                  onChange={(e) => setHeightMetric(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-semibold text-sm"
                  placeholder="e.g. 175"
                />
              </div>
             </div>
          </div>

          <div className={`transition-all duration-300 absolute inset-0 ${unit === 'imperial' ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 translate-x-10 pointer-events-none'}`}>
             <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightImperial}
                  onChange={(e) => setWeightImperial(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-semibold text-sm"
                  placeholder="e.g. 150"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-1">Feet</label>
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-semibold text-sm"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 ml-1">Inches</label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-semibold text-sm"
                    placeholder="10"
                  />
                </div>
              </div>
             </div>
          </div>
        </div>

        {!bmi ? (
          <button
            onClick={calculateBMI}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all transform active:scale-95 text-sm"
          >
            Calculate BMI
          </button>
        ) : (
          <div className="animate-fade-in-up space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center relative overflow-hidden">
              <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">Your BMI Result</span>
              
              <div className="flex items-end justify-center gap-2 mb-3">
                <span className="text-4xl font-black text-slate-900 leading-none">{bmi}</span>
                <span className="text-xs text-slate-500 font-medium mb-1">kg/m²</span>
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border mb-4 ${getStatusColor(status)}`}>
                {status}
              </div>

              {/* Visual Gauge */}
              <div className="relative h-3 bg-gray-200 rounded-full w-full mb-1 mt-2 overflow-hidden">
                 <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500"></div>
              </div>
              <div className="relative w-full h-4">
                 <div 
                    className="absolute top-0 transform -translate-x-1/2 transition-all duration-500 ease-out"
                    style={{ left: `${getMarkerPosition(bmi)}%` }}
                 >
                    <ChevronDown size={16} className="text-slate-900 fill-slate-900" />
                 </div>
              </div>
              <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                 <span>Under</span>
                 <span>Normal</span>
                 <span>Over</span>
                 <span>Obese</span>
              </div>
            </div>
            
            <button 
              onClick={reset} 
              className="w-full text-slate-500 hover:text-brand-green font-bold text-xs flex items-center justify-center gap-2 py-2 transition-colors"
            >
              <RefreshCw size={14} /> Calculate Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;