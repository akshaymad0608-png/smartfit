import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Play, Flame, HeartPulse, Trophy, Dumbbell, Apple } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

const spring = { stiffness: 120, damping: 18, mass: 0.6 };

/**
 * Drop your own photo of a female athlete here to fill the hero:
 *   public/hero-athlete.jpg   (or change the path below)
 * Recommended: portrait, ~900×1200px, subject on the right side works best.
 */
const HERO_IMAGE = '/hero-athlete.jpg';

/**
 * A single parallax layer. Reads the shared normalized cursor position
 * (mx, my ∈ [-0.5, 0.5]) and translates/tilts by `depth` px — deeper elements
 * move more, giving a cursor-driven 3D feel. An inner wrapper keeps a gentle
 * idle float so the scene still breathes when the cursor is still / on touch.
 */
function ParallaxCard({
  mx,
  my,
  depth,
  className,
  floatDelay = 0,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  floatDelay?: number;
  children: ReactNode;
}) {
  const x = useSpring(useTransform(mx, (v) => v * depth), spring);
  const y = useSpring(useTransform(my, (v) => v * depth), spring);
  const rotateY = useSpring(useTransform(mx, (v) => v * (depth * 0.12)), spring);
  const rotateX = useSpring(useTransform(my, (v) => v * (-depth * 0.12)), spring);

  return (
    <motion.div style={{ x, y, rotateX, rotateY, transformPerspective: 800 }} className={className}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [imgOk, setImgOk] = useState(true);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const blobX = useSpring(useTransform(mx, (v) => v * -40), spring);
  const blobY = useSpring(useTransform(my, (v) => v * -40), spring);

  // The photo itself gets a subtle parallax (moves less than the chips).
  const imgX = useSpring(useTransform(mx, (v) => v * 16), spring);
  const imgY = useSpring(useTransform(my, (v) => v * 16), spring);

  return (
    <section className="relative overflow-hidden" onMouseMove={handleMove} onMouseLeave={reset}>
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl"
      />

      <Container className="relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge tone="secondary" className="mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Trusted by 250,000+ people
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-hero font-extrabold text-heading"
            >
              Smarter fitness.
              <br />
              <span className="text-gradient">Better health.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-xl text-body-lg text-body"
            >
              Guided workouts, science-backed nutrition, precise health calculators and an AI coach —
              everything you need to train smarter and feel better, in one clean platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button as="link" to="/programs" size="lg" rightIcon={<ArrowRight size={18} />}>
                Start your journey
              </Button>
              <Button as="link" to="/ai-coach" size="lg" variant="outline" leftIcon={<Play size={16} />}>
                Try the AI Coach
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-sm text-muted"
            >
              Free to start · No equipment required · Cancel anytime
            </motion.p>
          </div>

          {/* Athlete photo + cursor-parallax stat chips */}
          <div
            className="relative mx-auto hidden h-[32rem] w-full max-w-md lg:block"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow ring behind the photo */}
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl" />

            {/* Main photo (with graceful fallback if not yet added) */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="absolute inset-4 overflow-hidden rounded-[2rem] border border-line bg-card shadow-card"
            >
              {imgOk ? (
                <img
                  src={HERO_IMAGE}
                  alt="A SmartFit member training with focus"
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 via-surface-muted to-secondary/20">
                  <div className="bg-grid absolute inset-0 opacity-50" />
                  <div className="relative text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-card text-primary shadow-soft">
                      <Dumbbell size={26} />
                    </span>
                    <p className="mt-4 px-6 text-sm font-medium text-muted">
                      Add your photo at{' '}
                      <code className="rounded bg-card px-1.5 py-0.5 text-heading">
                        public/hero-athlete.jpg
                      </code>
                    </p>
                  </div>
                </div>
              )}
              {/* Bottom gradient + caption for legibility over the photo */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-xs font-medium text-white/80">Today’s focus</p>
                <p className="text-lg font-bold text-white">Build &amp; Fuel 💪</p>
              </div>
            </motion.div>

            {/* Strength chip (bodybuilding) */}
            <ParallaxCard mx={mx} my={my} depth={72} floatDelay={0} className="absolute -left-4 top-6">
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Dumbbell size={22} />
                </span>
                <div>
                  <p className="text-xs text-muted">Strength</p>
                  <p className="font-bold text-heading">+12% this month</p>
                </div>
              </div>
            </ParallaxCard>

            {/* Calories chip */}
            <ParallaxCard mx={mx} my={my} depth={56} floatDelay={1} className="absolute -right-3 -top-2">
              <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3 shadow-card">
                <Flame size={20} className="text-accent" />
                <div>
                  <p className="text-xs text-muted">Calories</p>
                  <p className="font-bold text-heading">1,840</p>
                </div>
              </div>
            </ParallaxCard>

            {/* Nutrition chip */}
            <ParallaxCard mx={mx} my={my} depth={92} floatDelay={0.6} className="absolute -right-6 top-40">
              <div className="w-44 rounded-3xl border border-line bg-card p-5 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary/15 text-secondary">
                  <Apple size={20} />
                </span>
                <p className="mt-3 text-sm text-muted">Protein today</p>
                <p className="text-2xl font-extrabold text-heading">148g</p>
                <div className="mt-2 h-1.5 rounded-full bg-surface-muted">
                  <div className="h-1.5 w-4/5 rounded-full bg-gradient-to-r from-secondary to-primary" />
                </div>
              </div>
            </ParallaxCard>

            {/* Heart-rate chip */}
            <ParallaxCard mx={mx} my={my} depth={100} floatDelay={0.4} className="absolute -left-5 bottom-24">
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <HeartPulse size={20} />
                </span>
                <div>
                  <p className="text-xs text-muted">Heart rate</p>
                  <p className="font-bold text-heading">62 bpm</p>
                </div>
              </div>
            </ParallaxCard>

            {/* Streak chip */}
            <ParallaxCard mx={mx} my={my} depth={78} floatDelay={1.4} className="absolute -bottom-3 right-4">
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary/15 text-secondary">
                  <Trophy size={20} />
                </span>
                <div>
                  <p className="text-xs text-muted">Streak</p>
                  <p className="font-bold text-heading">14 days 🔥</p>
                </div>
              </div>
            </ParallaxCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
