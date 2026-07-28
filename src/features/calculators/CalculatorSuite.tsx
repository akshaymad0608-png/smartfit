import { motion } from 'framer-motion';
import { Download, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { useToast } from '@/contexts/ToastContext';
import { MacroDonut } from './MacroDonut';
import { downloadReport } from './downloadReport';
import {
  activityFactors,
  bmi,
  bmiCategory,
  bmr,
  bodyFatNavy,
  calorieTarget,
  idealWeight,
  leanBodyMass,
  macros,
  proteinTarget,
  tdee,
  waterIntakeLitres,
  type ActivityLevel,
  type Goal,
  type Sex,
} from './formulas';

interface Biometrics {
  sex: Sex;
  age: number;
  height: number;
  weight: number;
  neck: number;
  waist: number;
  hip: number;
  activity: ActivityLevel;
  goal: Goal;
}

const defaults: Biometrics = {
  sex: 'male',
  age: 28,
  height: 175,
  weight: 72,
  neck: 38,
  waist: 84,
  hip: 96,
  activity: 'moderate',
  goal: 'maintain',
};

function ResultRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0">
      <span className="text-sm text-body">{label}</span>
      <span className="text-right">
        <span className="text-lg font-bold text-heading">{value}</span>
        {hint && <span className="ml-2 text-xs text-muted">{hint}</span>}
      </span>
    </div>
  );
}

const goalLabels: Record<Goal, string> = {
  lose: 'Lose fat',
  maintain: 'Maintain',
  gain: 'Build muscle',
};

export function CalculatorSuite() {
  const [bio, setBio] = useState<Biometrics>(defaults);
  const { toast } = useToast();

  const set = <K extends keyof Biometrics>(key: K, value: Biometrics[K]) =>
    setBio((b) => ({ ...b, [key]: value }));
  const num = (key: keyof Biometrics) => (e: React.ChangeEvent<HTMLInputElement>) =>
    set(key, (Number(e.target.value) || 0) as never);

  const r = useMemo(() => {
    const bmiVal = bmi(bio.weight, bio.height);
    const bmrVal = bmr(bio.sex, bio.weight, bio.height, bio.age);
    const tdeeVal = tdee(bmrVal, bio.activity);
    const calories = calorieTarget(tdeeVal, bio.goal);
    const bf = bodyFatNavy(bio.sex, bio.height, bio.neck, bio.waist, bio.hip);
    const protein = proteinTarget(bio.weight, bio.goal);
    return {
      bmi: bmiVal,
      bmiCat: bmiCategory(bmiVal),
      bmr: bmrVal,
      tdee: tdeeVal,
      calories,
      ideal: idealWeight(bio.sex, bio.height),
      bodyFat: bf,
      lbm: leanBodyMass(bio.weight, bf),
      water: waterIntakeLitres(bio.weight, bio.activity),
      protein,
      macros: macros(calories, protein),
    };
  }, [bio]);

  const onDownload = async () => {
    try {
      await downloadReport([
        { label: 'BMI', value: `${r.bmi} (${r.bmiCat.label})` },
        { label: 'Ideal weight', value: `${r.ideal} kg` },
        { label: 'Body fat (est.)', value: `${r.bodyFat}%` },
        { label: 'Lean body mass', value: `${r.lbm} kg` },
        { label: 'BMR', value: `${r.bmr} kcal/day` },
        { label: 'TDEE', value: `${r.tdee} kcal/day` },
        { label: `Calorie target (${goalLabels[bio.goal]})`, value: `${r.calories} kcal/day` },
        { label: 'Protein target', value: `${r.protein} g/day` },
        {
          label: 'Macros (P/C/F)',
          value: `${r.macros.protein} / ${r.macros.carbs} / ${r.macros.fat} g`,
        },
        { label: 'Water target', value: `${r.water} L/day` },
      ]);
      toast('Report downloaded as PDF.', 'success');
    } catch {
      toast('Could not generate the PDF. Please try again.', 'error');
    }
  };

  const selectCls =
    'w-full rounded-2xl border border-line bg-card px-4 py-3 text-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
      {/* Inputs */}
      <Card className="h-fit p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-card-title font-bold text-heading">Your details</h3>
          <button
            onClick={() => setBio(defaults)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary"
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-heading">Sex</span>
            <div className="grid grid-cols-2 gap-2">
              {(['male', 'female'] as Sex[]).map((s) => (
                <button
                  key={s}
                  onClick={() => set('sex', s)}
                  className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                    bio.sex === s
                      ? 'border-primary bg-primary-50 text-primary dark:bg-primary/15'
                      : 'border-line text-body hover:border-primary/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="Age" type="number" value={bio.age} onChange={num('age')} suffix="yrs" />
            <Input
              label="Height"
              type="number"
              value={bio.height}
              onChange={num('height')}
              suffix="cm"
            />
          </div>
          <Input
            label="Weight"
            type="number"
            value={bio.weight}
            onChange={num('weight')}
            suffix="kg"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input label="Neck" type="number" value={bio.neck} onChange={num('neck')} suffix="cm" />
            <Input
              label="Waist"
              type="number"
              value={bio.waist}
              onChange={num('waist')}
              suffix="cm"
            />
          </div>
          {bio.sex === 'female' && (
            <Input label="Hip" type="number" value={bio.hip} onChange={num('hip')} suffix="cm" />
          )}

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-heading" htmlFor="activity">
              Activity level
            </label>
            <select
              id="activity"
              className={selectCls}
              value={bio.activity}
              onChange={(e) => set('activity', e.target.value as ActivityLevel)}
            >
              {Object.entries(activityFactors).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-semibold text-heading">Goal</span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(goalLabels) as Goal[]).map((g) => (
                <button
                  key={g}
                  onClick={() => set('goal', g)}
                  className={`rounded-2xl border px-2 py-2.5 text-xs font-semibold transition-colors ${
                    bio.goal === g
                      ? 'border-primary bg-primary-50 text-primary dark:bg-primary/15'
                      : 'border-line text-body hover:border-primary/40'
                  }`}
                >
                  {goalLabels[g]}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={onDownload} variant="outline" className="w-full" leftIcon={<Download size={16} />}>
            Download PDF report
          </Button>
        </div>
      </Card>

      {/* Results */}
      <div>
        <Tabs
          items={[
            {
              id: 'body',
              label: 'Body',
              content: (
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted">Body Mass Index</span>
                      <Badge tone={r.bmiCat.tone}>{r.bmiCat.label}</Badge>
                    </div>
                    <motion.p
                      key={r.bmi}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-hero font-extrabold text-gradient"
                    >
                      {r.bmi}
                    </motion.p>
                    <BmiScale value={r.bmi} />
                  </Card>
                  <Card className="p-6">
                    <ResultRow label="Ideal weight (Devine)" value={`${r.ideal} kg`} />
                    <ResultRow label="Body fat (Navy est.)" value={`${r.bodyFat}%`} />
                    <ResultRow label="Lean body mass" value={`${r.lbm} kg`} />
                    <ResultRow label="Water target" value={`${r.water} L`} hint="per day" />
                  </Card>
                </div>
              ),
            },
            {
              id: 'energy',
              label: 'Energy',
              content: (
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-6">
                    <ResultRow label="BMR (Mifflin-St Jeor)" value={`${r.bmr}`} hint="kcal/day" />
                    <ResultRow label="TDEE" value={`${r.tdee}`} hint="kcal/day" />
                    <ResultRow
                      label={`Target — ${goalLabels[bio.goal]}`}
                      value={`${r.calories}`}
                      hint="kcal/day"
                    />
                  </Card>
                  <Card className="flex flex-col justify-center p-6">
                    <p className="text-sm text-body">
                      To <strong className="text-heading">{goalLabels[bio.goal].toLowerCase()}</strong>,
                      aim for around{' '}
                      <strong className="text-primary">{r.calories} kcal</strong> per day. Adjust by
                      ±100 kcal every two weeks based on real progress, not the scale alone.
                    </p>
                  </Card>
                </div>
              ),
            },
            {
              id: 'nutrition',
              label: 'Nutrition',
              content: (
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="flex items-center p-6">
                    <MacroDonut macros={r.macros} />
                  </Card>
                  <Card className="p-6">
                    <ResultRow label="Protein target" value={`${r.protein} g`} hint="per day" />
                    <ResultRow label="Carbs" value={`${r.macros.carbs} g`} />
                    <ResultRow label="Fat" value={`${r.macros.fat} g`} />
                    <ResultRow label="Water" value={`${r.water} L`} hint="per day" />
                  </Card>
                </div>
              ),
            },
          ]}
        />
        <p className="mt-5 text-xs text-muted">
          These are estimates using established formulas and are not a substitute for professional
          medical advice.
        </p>
      </div>
    </div>
  );
}

function BmiScale({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, ((value - 12) / (40 - 12)) * 100));
  return (
    <div className="mt-5">
      <div className="relative h-2.5 rounded-full bg-gradient-to-r from-amber-400 via-secondary to-red-400">
        <motion.span
          className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-card bg-heading shadow"
          initial={{ left: '50%' }}
          animate={{ left: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-muted">
        <span>15</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40</span>
      </div>
    </div>
  );
}
