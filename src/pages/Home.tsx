import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Brain,
  HeartPulse,
  Leaf,
  Salad,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Counter } from '@/components/ui/Counter';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { WorkoutCard } from '@/components/cards/WorkoutCard';
import { ProgramCard } from '@/components/cards/ProgramCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { Reveal } from '@/components/motion/Reveal';
import { staggerContainer, staggerItem } from '@/components/motion/variants';
import { PageTransition } from '@/components/motion/PageTransition';
import { Hero } from '@/features/home/Hero';
import { NewsletterForm } from '@/features/home/NewsletterForm';
import { Seo } from '@/seo/Seo';
import { faqSchema, organizationSchema, websiteSchema } from '@/seo/schema';
import { workoutCategories, workouts } from '@/data/workouts';
import { blogPosts, faqs, programs, stats, testimonials } from '@/data/content';

const benefits = [
  { icon: Timer, title: 'Time-efficient', text: 'Effective sessions from 15 minutes — built for real schedules.' },
  { icon: Brain, title: 'AI-personalised', text: 'Plans that adapt to your goals, level and available equipment.' },
  { icon: ShieldCheck, title: 'Evidence-based', text: 'Every routine and calculator is grounded in exercise science.' },
  { icon: HeartPulse, title: 'Whole-health', text: 'Training, nutrition, recovery and mindset in one place.' },
];

const dietHighlights = [
  { icon: Salad, title: 'Balanced meal plans', text: 'Goal-based plans for weight loss, muscle gain and maintenance.' },
  { icon: Leaf, title: 'Veg, vegan & Indian', text: 'Flexible options built around foods you actually enjoy.' },
  { icon: Activity, title: 'Macro-aware', text: 'Protein, carbs and fats dialled in to your calorie target.' },
];

export default function Home() {
  const featuredWorkouts = workouts.slice(0, 3);
  const featuredPrograms = programs.filter((p) => p.featured);

  return (
    <PageTransition>
      <Seo
        path="/"
        schema={[organizationSchema(), websiteSchema(), faqSchema(faqs)]}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Statistics */}
      <Section spacing="sm" className="border-y border-line bg-surface-muted">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <dd className="text-hero font-extrabold text-gradient">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-sm font-medium text-muted">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* 3. Featured Programs */}
      <Section>
        <SectionHeader
          eyebrow="Programs"
          title="Guided plans for every goal"
          subtitle="Follow a structured, progressive program and let SmartFit handle the what, when and how much."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featuredPrograms.map((p) => (
            <Reveal key={p.id}>
              <ProgramCard program={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as="link" to="/programs" variant="outline" rightIcon={<ArrowRight size={16} />}>
            Browse all programs
          </Button>
        </div>
      </Section>

      {/* 4. Workout Categories */}
      <Section muted>
        <SectionHeader
          eyebrow="Workouts"
          title="Train the way you want"
          subtitle="From no-equipment home circuits to heavy gym sessions — find a category that fits your goal."
        />
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3"
        >
          {workoutCategories.map((cat) => (
            <motion.li key={cat.key} variants={staggerItem}>
              <Link
                to={`/workouts?cat=${cat.key}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
              >
                <div>
                  <p className="font-bold text-heading">{cat.label}</p>
                  <p className="text-sm text-muted">{cat.description}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
                />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* 5. Featured workouts */}
      <Section>
        <SectionHeader eyebrow="Popular right now" title="Workouts our members love" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featuredWorkouts.map((w) => (
            <Reveal key={w.id}>
              <WorkoutCard workout={w} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. BMI Calculator teaser + 7. AI Coach */}
      <Section muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="flex h-full flex-col justify-between gap-6 p-8">
              <div>
                <Badge tone="primary" className="mb-4">
                  <Activity size={13} /> Free tools
                </Badge>
                <h3 className="text-section font-extrabold text-heading">
                  Know your numbers
                </h3>
                <p className="mt-3 text-body">
                  Calculate your BMI, BMR, TDEE, body-fat, ideal weight and macros in seconds — then
                  download a clean PDF report to keep.
                </p>
              </div>
              <div>
                <Button as="link" to="/calculators" rightIcon={<ArrowRight size={16} />}>
                  Open calculators
                </Button>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="flex h-full flex-col justify-between gap-6 bg-gradient-to-br from-primary to-secondary p-8 text-white">
              <div>
                <Badge className="mb-4 bg-white/20 text-white">
                  <Sparkles size={13} /> AI Coach
                </Badge>
                <h3 className="text-section font-extrabold text-white">
                  Your personal AI coach
                </h3>
                <p className="mt-3 text-white/90">
                  Generate a workout, plan your meals or get daily motivation tailored to your goals.
                  Built to grow smarter over time.
                </p>
              </div>
              <div>
                <Button as="link" to="/ai-coach" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary" rightIcon={<ArrowRight size={16} />}>
                  Meet your coach
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* 8. Healthy Diet */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Badge tone="secondary" className="mb-4">
              <Leaf size={13} /> Nutrition
            </Badge>
            <h2 className="text-section font-extrabold text-heading">
              Eat well without the guesswork
            </h2>
            <p className="mt-4 text-body-lg text-body">
              Nutrition is half the battle. SmartFit gives you balanced, goal-based meal plans and a
              food database so you always know what to eat next.
            </p>
            <div className="mt-8 space-y-4">
              {dietHighlights.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                    <d.icon size={20} />
                  </span>
                  <div>
                    <p className="font-bold text-heading">{d.title}</p>
                    <p className="text-sm text-muted">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button as="link" to="/nutrition" className="mt-8" rightIcon={<ArrowRight size={16} />}>
              Explore nutrition
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Protein bowl', img: '/images/meals/protein-bowl.jpg' },
                { name: 'Overnight oats', img: '/images/meals/overnight-oats.jpg' },
                { name: 'Grilled salmon', img: '/images/meals/grilled-salmon.jpg' },
                { name: 'Veg thali', img: '/images/meals/veg-thali.jpg' },
              ].map((meal) => (
                <div
                  key={meal.name}
                  className="group relative aspect-square overflow-hidden rounded-3xl border border-line"
                >
                  <img
                    src={meal.img}
                    alt={meal.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="font-bold text-white">{meal.name}</p>
                    <p className="text-xs text-white/80">Balanced · High protein</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 9. Benefits */}
      <Section muted>
        <SectionHeader eyebrow="Why SmartFit" title="Everything you need, nothing you don’t" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <Reveal key={b.title}>
              <Card className="h-full p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <b.icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-heading">{b.title}</h3>
                <p className="mt-2 text-sm text-muted">{b.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10. Testimonials */}
      <Section>
        <SectionHeader eyebrow="Results" title="Loved by members worldwide" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Reveal key={t.id}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 11. Transformation / Before-After */}
      <Section muted>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Badge tone="accent" className="mb-4">
              <TrendingUp size={13} /> Real progress
            </Badge>
            <h2 className="text-section font-extrabold text-heading">
              Small habits, remarkable change
            </h2>
            <p className="mt-4 text-body-lg text-body">
              Members who train just three times a week and track their nutrition see meaningful
              change within the first eight weeks. Consistency compounds.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <p className="text-sm font-semibold text-muted">Week 1</p>
                <p className="mt-3 text-hero font-extrabold text-muted/70">82kg</p>
                <p className="mt-1 text-sm text-muted">24% body fat</p>
              </Card>
              <Card className="border-secondary/30 bg-secondary/5 p-6 text-center">
                <p className="text-sm font-semibold text-secondary">Week 12</p>
                <p className="mt-3 text-hero font-extrabold text-gradient">74kg</p>
                <p className="mt-1 text-sm text-muted">17% body fat</p>
              </Card>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 12. Latest Blogs */}
      <Section>
        <SectionHeader eyebrow="Blog" title="Learn from the SmartFit team" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <Reveal key={p.id}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as="link" to="/blog" variant="outline" rightIcon={<ArrowRight size={16} />}>
            Read the blog
          </Button>
        </div>
      </Section>

      {/* 13. FAQs */}
      <Section muted>
        <SectionHeader eyebrow="FAQ" title="Questions, answered" />
        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </Section>

      {/* 14. Newsletter + CTA */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-center md:p-16">
            <div className="bg-grid absolute inset-0 opacity-20" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-section font-extrabold text-white">
                Start training smarter today
              </h2>
              <p className="mt-4 text-white/90">
                Join 250,000+ people getting fitter with SmartFit. Free to start, no equipment needed.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <NewsletterForm />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button as="link" to="/programs" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary">
                  Explore programs
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
