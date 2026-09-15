import { AnimatePresence, motion } from 'framer-motion';
import { Droplets, Flame, Footprints, HeartPulse, Minus, Moon, Plus, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/** Today's date as a stable key, so every tracked number resets on its own each day. */
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const STEP_GOAL = 8000;
const WATER_GOAL = 8; // glasses (~250ml each)
const SLEEP_GOAL = 8; // hours

function Ring({
  pct,
  color,
  size = 96,
  stroke = 9,
  children,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(1, Math.max(0, pct));
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - clamped) }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

function heartRateZone(bpm: number): { label: string; tone: 'primary' | 'secondary' | 'accent' } {
  if (bpm <= 0) return { label: 'No reading', tone: 'primary' };
  if (bpm < 60) return { label: 'Below resting', tone: 'secondary' };
  if (bpm <= 100) return { label: 'Resting', tone: 'secondary' };
  if (bpm <= 140) return { label: 'Fat burn', tone: 'primary' };
  if (bpm <= 170) return { label: 'Cardio', tone: 'accent' };
  return { label: 'Peak', tone: 'accent' };
}

/**
 * Step counter tile. Steps are logged manually (no device sensor on a
 * website) via quick-add chips or a custom amount — persisted per day.
 */
function StepsTile() {
  const [steps, setSteps] = useLocalStorage<number>(`fs-steps-${todayKey()}`, 0);
  const pct = steps / STEP_GOAL;
  const kcal = Math.round(steps * 0.04);
  const add = (n: number) => setSteps((s) => Math.max(0, s + n));

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-heading">
          <Footprints size={18} className="text-primary" /> Steps
        </h3>
        <Badge tone={pct >= 1 ? 'secondary' : 'primary'}>{pct >= 1 ? 'Goal hit!' : `${Math.round(pct * 100)}%`}</Badge>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <Ring pct={pct} color="#3B82F6">
          <span className="text-lg font-extrabold text-heading">{steps.toLocaleString()}</span>
          <span className="text-[11px] text-muted">/ {STEP_GOAL.toLocaleString()}</span>
        </Ring>
        <div className="flex-1">
          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Flame size={14} className="text-accent" /> ~{kcal} kcal burned
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[500, 1000, 2000].map((n) => (
              <button
                key={n}
                onClick={() => add(n)}
                className="flex min-h-11 items-center rounded-full border border-line bg-surface-muted px-3.5 text-xs font-semibold text-body transition-colors hover:border-primary hover:text-primary"
              >
                +{n.toLocaleString()}
              </button>
            ))}
            <button
              onClick={() => setSteps(0)}
              aria-label="Reset steps"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/** Heart rate log — enter a reading, see the latest, its zone and a short history sparkline. */
function HeartRateTile() {
  const [readings, setReadings] = useLocalStorage<number[]>(`fs-hr-${todayKey()}`, []);
  const [input, setInput] = useState('');
  const latest = readings[readings.length - 1] ?? 0;
  const zone = heartRateZone(latest);

  const logReading = () => {
    const bpm = Math.round(Number(input));
    if (!bpm || bpm < 30 || bpm > 240) return;
    setReadings((r) => [...r.slice(-9), bpm]);
    setInput('');
  };

  const recent = readings.slice(-8);
  const max = Math.max(...recent, 1);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-heading">
          <HeartPulse size={18} className="text-accent" /> Heart rate
        </h3>
        {readings.length > 0 && <Badge tone={zone.tone}>{zone.label}</Badge>}
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-3xl font-extrabold text-heading">{latest || '—'}</span>
        <span className="mb-1 text-sm text-muted">bpm</span>
      </div>

      {recent.length > 1 && (
        <div className="mt-3 flex h-10 items-end gap-1">
          {recent.map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm bg-accent/60"
              initial={{ height: 0 }}
              animate={{ height: `${(v / max) * 100}%` }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            />
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && logReading()}
          placeholder="e.g. 72"
          className="h-11 w-full min-w-0 rounded-full border border-line bg-surface-muted px-4 text-sm text-heading outline-none focus:border-primary"
        />
        <button
          onClick={logReading}
          className="h-11 shrink-0 rounded-full bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
        >
          Log
        </button>
      </div>
    </Card>
  );
}

/** Water intake — tap a glass to add ~250ml, tap again to remove one by mistake. */
function WaterTile() {
  const [glasses, setGlasses] = useLocalStorage<number>(`fs-water-${todayKey()}`, 0);
  const pct = glasses / WATER_GOAL;
  const liters = (glasses * 0.25).toFixed(2);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-heading">
          <Droplets size={18} className="text-primary" /> Water intake
        </h3>
        <Badge tone={pct >= 1 ? 'secondary' : 'primary'}>{liters} L</Badge>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <Ring pct={pct} color="#3B82F6" size={80} stroke={7}>
          <span className="text-base font-extrabold text-heading">{glasses}</span>
          <span className="text-[10px] text-muted">/ {WATER_GOAL} glasses</span>
        </Ring>
        <div className="flex flex-1 flex-wrap gap-2">
          <AnimatePresence initial={false}>
            {Array.from({ length: WATER_GOAL }).map((_, i) => (
              <motion.button
                key={i}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setGlasses(i < glasses ? i : i + 1)}
                aria-label={i < glasses ? 'Remove a glass' : 'Add a glass'}
                className={
                  i < glasses
                    ? 'grid h-11 w-11 place-items-center rounded-full bg-primary text-white'
                    : 'grid h-11 w-11 place-items-center rounded-full border border-dashed border-line text-muted transition-colors hover:border-primary hover:text-primary'
                }
              >
                <Droplets size={16} />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}

/** Sleep log — quick +/- half-hour stepper against last night's target. */
function SleepTile() {
  const [minutes, setMinutes] = useLocalStorage<number>(`fs-sleep-${todayKey()}`, 0);
  const hours = minutes / 60;
  const pct = hours / SLEEP_GOAL;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-heading">
          <Moon size={18} className="text-secondary" /> Sleep
        </h3>
        <Badge tone={pct >= 0.875 ? 'secondary' : 'primary'}>
          {pct >= 0.875 ? 'Well rested' : `${Math.round(pct * 100)}% of goal`}
        </Badge>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          onClick={() => setMinutes((m) => Math.max(0, m - 30))}
          aria-label="Subtract 30 minutes"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-body transition-colors hover:border-primary hover:text-primary"
        >
          <Minus size={16} />
        </button>
        <span className="min-w-24 text-center text-2xl font-extrabold text-heading">
          {Math.floor(hours)}h {minutes % 60}m
        </span>
        <button
          onClick={() => setMinutes((m) => Math.min(16 * 60, m + 30))}
          aria-label="Add 30 minutes"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-body transition-colors hover:border-primary hover:text-primary"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">Goal: {SLEEP_GOAL}h a night</p>
    </Card>
  );
}

/**
 * App-style health tracker: steps, heart rate, water intake and sleep,
 * logged manually and persisted per day in localStorage (no device sensor
 * access from a website, so this is the honest equivalent — quick taps
 * instead of a form). Each tile resets itself at midnight since the storage
 * key is keyed by today's date.
 */
export function HealthTracker() {
  const dateLabel = useMemo(
    () => new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
    [],
  );

  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-heading">Health tracker</h2>
          <p className="text-sm text-muted">{dateLabel} · logged on this device</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Reveal>
          <StepsTile />
        </Reveal>
        <Reveal>
          <HeartRateTile />
        </Reveal>
        <Reveal>
          <WaterTile />
        </Reveal>
        <Reveal>
          <SleepTile />
        </Reveal>
      </div>
    </div>
  );
}
