/**
 * Health & fitness formulas. All inputs are metric (kg, cm, years) unless noted.
 * These are widely-used estimation formulas, not medical diagnostics.
 */

export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
export type Goal = 'lose' | 'maintain' | 'gain';

export const activityFactors: Record<ActivityLevel, { factor: number; label: string }> = {
  sedentary: { factor: 1.2, label: 'Sedentary (little/no exercise)' },
  light: { factor: 1.375, label: 'Light (1–3 days/week)' },
  moderate: { factor: 1.55, label: 'Moderate (3–5 days/week)' },
  active: { factor: 1.725, label: 'Active (6–7 days/week)' },
  athlete: { factor: 1.9, label: 'Athlete (2x/day training)' },
};

/** Body Mass Index = kg / m². */
export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return round(weightKg / (m * m), 1);
}

export function bmiCategory(value: number): { label: string; tone: 'primary' | 'secondary' | 'accent' } {
  if (value < 18.5) return { label: 'Underweight', tone: 'accent' };
  if (value < 25) return { label: 'Healthy weight', tone: 'secondary' };
  if (value < 30) return { label: 'Overweight', tone: 'accent' };
  return { label: 'Obese', tone: 'accent' };
}

/** Basal Metabolic Rate — Mifflin-St Jeor equation. */
export function bmr(sex: Sex, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(base + (sex === 'male' ? 5 : -161));
}

/** Total Daily Energy Expenditure. */
export function tdee(bmrValue: number, activity: ActivityLevel): number {
  return Math.round(bmrValue * activityFactors[activity].factor);
}

/** Calorie target for a goal (±15% adjustment). */
export function calorieTarget(tdeeValue: number, goal: Goal): number {
  if (goal === 'lose') return Math.round(tdeeValue * 0.82);
  if (goal === 'gain') return Math.round(tdeeValue * 1.12);
  return tdeeValue;
}

/** Ideal body weight — Devine formula (kg). */
export function idealWeight(sex: Sex, heightCm: number): number {
  const inchesOver5ft = Math.max(0, heightCm / 2.54 - 60);
  const base = sex === 'male' ? 50 : 45.5;
  return round(base + 2.3 * inchesOver5ft, 1);
}

/** Body fat % — U.S. Navy circumference method (cm). */
export function bodyFatNavy(
  sex: Sex,
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm = 0,
): number {
  if (sex === 'male') {
    const val =
      495 /
        (1.0324 - 0.19077 * log10(waistCm - neckCm) + 0.15456 * log10(heightCm)) -
      450;
    return round(clamp(val, 2, 60), 1);
  }
  const val =
    495 /
      (1.29579 - 0.35004 * log10(waistCm + hipCm - neckCm) + 0.221 * log10(heightCm)) -
    450;
  return round(clamp(val, 2, 60), 1);
}

/** Lean body mass from weight and body-fat %. */
export function leanBodyMass(weightKg: number, bodyFatPct: number): number {
  return round(weightKg * (1 - bodyFatPct / 100), 1);
}

/** Daily water target (litres) — ~35 ml/kg + activity bump. */
export function waterIntakeLitres(weightKg: number, activity: ActivityLevel): number {
  const bump = { sedentary: 0, light: 0.35, moderate: 0.5, active: 0.7, athlete: 1 }[activity];
  return round((weightKg * 0.035 + bump), 1);
}

/** Daily protein target (g) — grams per kg by goal. */
export function proteinTarget(weightKg: number, goal: Goal): number {
  const perKg = goal === 'gain' ? 2.0 : goal === 'lose' ? 1.8 : 1.6;
  return Math.round(weightKg * perKg);
}

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  proteinKcal: number;
  carbsKcal: number;
  fatKcal: number;
}

/** Macro split from calorie target and protein grams. Fat = 25% kcal, rest carbs. */
export function macros(calories: number, proteinGrams: number): Macros {
  const proteinKcal = proteinGrams * 4;
  const fatKcal = Math.round(calories * 0.25);
  const fat = Math.round(fatKcal / 9);
  const carbsKcal = Math.max(0, calories - proteinKcal - fatKcal);
  const carbs = Math.round(carbsKcal / 4);
  return { protein: proteinGrams, carbs, fat, proteinKcal, carbsKcal, fatKcal };
}

// helpers
function round(n: number, dp = 0): number {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}
function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
function log10(n: number): number {
  return Math.log(n) / Math.LN10;
}
