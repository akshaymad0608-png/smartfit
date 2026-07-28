import { motion } from 'framer-motion';
import type { Macros } from './formulas';

const COLORS = {
  protein: '#3B82F6',
  carbs: '#10B981',
  fat: '#F59E0B',
};

/** Animated SVG donut showing macro calorie split. */
export function MacroDonut({ macros }: { macros: Macros }) {
  const total = macros.proteinKcal + macros.carbsKcal + macros.fatKcal || 1;
  const segments = [
    { key: 'protein', value: macros.proteinKcal, color: COLORS.protein, label: 'Protein' },
    { key: 'carbs', value: macros.carbsKcal, color: COLORS.carbs, label: 'Carbs' },
    { key: 'fat', value: macros.fatKcal, color: COLORS.fat, label: 'Fat' },
  ];

  const r = 52;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <svg width="150" height="150" viewBox="0 0 150 150" role="img" aria-label="Macro split">
        <g transform="translate(75,75) rotate(-90)">
          <circle r={r} fill="none" stroke="var(--color-line)" strokeWidth="16" />
          {segments.map((seg) => {
            const frac = seg.value / total;
            const dash = frac * circumference;
            const el = (
              <motion.circle
                key={seg.key}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: -offset }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            );
            offset += dash;
            return el;
          })}
        </g>
        <text
          x="75"
          y="72"
          textAnchor="middle"
          className="fill-heading text-[20px] font-extrabold"
        >
          {total.toLocaleString()}
        </text>
        <text x="75" y="90" textAnchor="middle" className="fill-muted text-[10px] font-semibold">
          KCAL
        </text>
      </svg>

      <ul className="space-y-2.5">
        {segments.map((seg) => (
          <li key={seg.key} className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-sm font-semibold text-heading">{seg.label}</span>
            <span className="text-sm text-muted">
              {seg.key === 'protein'
                ? macros.protein
                : seg.key === 'carbs'
                  ? macros.carbs
                  : macros.fat}
              g · {Math.round((seg.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
