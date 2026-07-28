import { motion } from 'framer-motion';
import { Activity, Award, Droplets, Flame, Moon, TrendingDown, Target } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { useAuth } from '@/contexts/AuthContext';
import { Seo } from '@/seo/Seo';

const weightSeries = [82, 81.2, 80.5, 80.1, 79.3, 78.6, 78, 77.4, 76.8, 76.1, 75.5, 74.9];
const calorieWeek = [1980, 2100, 1850, 2200, 1900, 2400, 1750];
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function LineChart({ data }: { data: number[] }) {
  const w = 520;
  const h = 200;
  const pad = 24;
  const min = Math.min(...data) - 1;
  const max = Math.max(...data) + 1;
  const x = (i: number) => pad + (i * (w - pad * 2)) / (data.length - 1);
  const y = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const area = `${path} L ${x(data.length - 1)} ${h - pad} L ${x(0)} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Weight progress chart">
      <defs>
        <linearGradient id="lc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lc)" />
      <motion.path
        d={path}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#3B82F6" />
      ))}
    </svg>
  );
}

function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-48 items-end justify-between gap-2">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <motion.div
            className="w-full rounded-t-lg bg-gradient-to-t from-secondary to-primary"
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="text-xs text-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Ring({ value, max, label }: { value: number; max: number; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  return (
    <div className="flex flex-col items-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--color-line)" strokeWidth="10" />
        <motion.circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 55 55)"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <text x="55" y="60" textAnchor="middle" className="fill-heading text-lg font-bold">
          {value}
        </text>
      </svg>
      <span className="mt-1 text-sm text-muted">{label}</span>
    </div>
  );
}

const kpis = [
  { icon: TrendingDown, label: 'Weight', value: '74.9 kg', delta: '-7.1 kg', tone: 'secondary' as const },
  { icon: Flame, label: 'Calories today', value: '1,840', delta: 'On target', tone: 'accent' as const },
  { icon: Activity, label: 'Workouts', value: '18', delta: 'this month', tone: 'primary' as const },
  { icon: Moon, label: 'Avg. sleep', value: '7h 20m', delta: '+15 min', tone: 'primary' as const },
];

const goals = [
  { label: 'Reach 74 kg', progress: 88 },
  { label: 'Train 4×/week', progress: 75 },
  { label: 'Hit protein daily', progress: 62 },
];

const achievements = ['7-day streak', 'First 5k run', '10 workouts', 'Hydration hero'];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login', { replace: true, state: { from: '/dashboard' } });
  }, [user, navigate]);

  if (!user) return null;
  const firstName = user.name.split(' ')[0];

  return (
    <PageTransition>
      <Seo title="Dashboard" description="Track your weight, calories, workout streak, hydration and goals." path="/dashboard" noindex />
      <PageHero
        eyebrow="Dashboard"
        title={`Welcome back, ${firstName}`}
        subtitle="Here's your progress at a glance. Keep the streak alive — consistency is everything."
        crumbs={[{ label: 'Dashboard' }]}
      />

      <Section spacing="md">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <Reveal key={k.label}>
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <k.icon size={18} />
                  </span>
                  <Badge tone={k.tone}>{k.delta}</Badge>
                </div>
                <p className="mt-4 text-2xl font-extrabold text-heading">{k.value}</p>
                <p className="text-sm text-muted">{k.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-heading">Weight progress</h2>
                <Badge tone="secondary">12 weeks</Badge>
              </div>
              <div className="mt-4">
                <LineChart data={weightSeries} />
              </div>
            </Card>
          </Reveal>
          <Reveal>
            <Card className="flex h-full flex-col items-center justify-center gap-4 p-6">
              <h2 className="font-bold text-heading">Hydration</h2>
              <Ring value={6} max={8} label="of 8 glasses" />
              <p className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Droplets size={14} className="text-primary" /> 1.5 L to go
              </p>
            </Card>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="font-bold text-heading">Calories this week</h2>
              <div className="mt-4">
                <BarChart data={calorieWeek} labels={days} />
              </div>
            </Card>
          </Reveal>
          <Reveal>
            <Card className="h-full p-6">
              <h2 className="flex items-center gap-2 font-bold text-heading">
                <Target size={18} className="text-primary" /> Goals
              </h2>
              <div className="mt-5 space-y-5">
                {goals.map((g) => (
                  <div key={g.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-body">{g.label}</span>
                      <span className="font-semibold text-heading">{g.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-muted">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${g.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <Card className="p-6">
            <h2 className="flex items-center gap-2 font-bold text-heading">
              <Award size={18} className="text-accent" /> Achievements
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {achievements.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-muted px-4 py-2 text-sm font-semibold text-body"
                >
                  <Award size={15} className="text-accent" /> {a}
                </span>
              ))}
            </div>
          </Card>
        </Reveal>
      </Section>
    </PageTransition>
  );
}
