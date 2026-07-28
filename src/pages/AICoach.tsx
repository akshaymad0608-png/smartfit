import { motion } from 'framer-motion';
import {
  CalendarRange,
  Dumbbell,
  Send,
  Sparkles,
  Salad,
  Sun,
  Target,
  Loader2,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { generate, type CoachMode, type CoachResponse } from '@/features/ai/generator';
import { cn } from '@/lib/cn';

const modes: { id: CoachMode; label: string; icon: typeof Dumbbell; hint: string }[] = [
  { id: 'workout', label: 'Workout Generator', icon: Dumbbell, hint: 'e.g. 30-min home fat-loss workout' },
  { id: 'meal', label: 'Meal Planner', icon: Salad, hint: 'e.g. vegetarian muscle-gain day' },
  { id: 'weekly', label: 'Weekly Plan', icon: CalendarRange, hint: 'e.g. strength-focused week' },
  { id: 'goal', label: 'Goal Recommendation', icon: Target, hint: 'e.g. lose 5kg sustainably' },
  { id: 'motivation', label: 'Daily Motivation', icon: Sun, hint: 'Tap generate for a boost' },
];

export default function AICoach() {
  const [mode, setMode] = useState<CoachMode>('workout');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoachResponse | null>(null);

  const activeMode = modes.find((m) => m.id === mode)!;

  const onGenerate = async () => {
    setLoading(true);
    setResult(null);
    const res = await generate({ mode, prompt });
    setResult(res);
    setLoading(false);
  };

  return (
    <PageTransition>
      <Seo
        title="AI Fitness Coach"
        description="Generate personalised workouts, meal plans and weekly schedules with the SmartFit AI Coach. Free, private and built to get smarter over time."
        path="/ai-coach"
        keywords={['AI fitness coach', 'AI workout planner', 'AI meal planner', 'workout generator']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'AI Coach', path: '/ai-coach' },
        ])}
      />
      <PageHero
        eyebrow="AI Coach"
        title="Your personal AI coach"
        subtitle="Describe your goal and let SmartFit generate a workout, meal plan, weekly schedule or goal roadmap in seconds."
        crumbs={[{ label: 'AI Coach' }]}
      >
        <Badge tone="secondary">
          <Sparkles size={13} /> Free · Private · API-ready
        </Badge>
      </PageHero>

      <Section spacing="md">
        <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
          {/* Mode picker */}
          <div className="space-y-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  setResult(null);
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all',
                  mode === m.id
                    ? 'border-primary bg-primary-50 dark:bg-primary/15'
                    : 'border-line bg-card hover:border-primary/40',
                )}
              >
                <span
                  className={cn(
                    'grid h-10 w-10 shrink-0 place-items-center rounded-xl',
                    mode === m.id ? 'bg-primary text-white' : 'bg-surface-muted text-body',
                  )}
                >
                  <m.icon size={18} />
                </span>
                <span className="font-semibold text-heading">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Prompt + result */}
          <div>
            <Card className="p-6">
              <label htmlFor="ai-prompt" className="mb-2 block font-semibold text-heading">
                {activeMode.label}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="ai-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && onGenerate()}
                  placeholder={activeMode.hint}
                  className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={onGenerate}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={16} />}
                  {loading ? 'Thinking…' : 'Generate'}
                </button>
              </div>
              <p className="mt-3 text-xs text-muted">
                Tip: include your goal, time available and any equipment for a sharper plan.
              </p>
            </Card>

            <div className="mt-6">
              {loading && (
                <Card className="animate-pulse space-y-3 p-6">
                  <div className="h-5 w-1/3 rounded bg-surface-muted" />
                  <div className="h-4 w-2/3 rounded bg-surface-muted" />
                  <div className="h-4 w-full rounded bg-surface-muted" />
                  <div className="h-4 w-5/6 rounded bg-surface-muted" />
                </Card>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-8">
                    <Badge tone="primary" className="mb-3">
                      <Sparkles size={13} /> Generated
                    </Badge>
                    <h2 className="text-card-title font-bold text-heading">{result.title}</h2>
                    <p className="mt-2 text-body">{result.intro}</p>
                    <div className="mt-6 space-y-6">
                      {result.sections.map((sec) => (
                        <div key={sec.heading}>
                          <h3 className="font-bold text-heading">{sec.heading}</h3>
                          <ul className="mt-2 space-y-2">
                            {sec.items.map((it, i) => (
                              <li key={i} className="flex gap-2.5 text-sm text-body">
                                <Check size={16} className="mt-0.5 shrink-0 text-secondary" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {result.footer && (
                      <p className="mt-6 rounded-2xl bg-surface-muted p-4 text-sm text-muted">
                        {result.footer}
                      </p>
                    )}
                  </Card>
                </motion.div>
              )}

              {!result && !loading && (
                <Reveal>
                  <div className="relative overflow-hidden rounded-3xl border border-line">
                    <img
                      src="/images/ai-coach.jpg"
                      alt="A coach guiding a training session"
                      loading="lazy"
                      className="h-72 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                        <Sparkles size={24} />
                      </span>
                      <p className="mt-4 text-lg font-bold text-white">
                        Pick a mode and describe your goal
                      </p>
                      <p className="mx-auto mt-1 max-w-sm text-sm text-white/80">
                        Your personalised plan will appear here in seconds.
                      </p>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>

        <p className="mt-10 rounded-2xl border border-line bg-surface-muted p-5 text-sm text-muted">
          <strong className="text-body">How this works:</strong> plans are generated on your device
          from SmartFit's coaching logic — no account or API key needed. The interface is built to
          connect to a large language model (such as the Claude API) so recommendations get even
          smarter in a future release.
        </p>
      </Section>
    </PageTransition>
  );
}
