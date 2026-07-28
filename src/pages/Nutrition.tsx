import { Apple, Beef, Droplets, Leaf, Salad, Wheat } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';

const plans = [
  { name: 'Weight Loss', kcal: '1,600–1,900', desc: 'A gentle deficit with high protein to preserve muscle.', tone: 'primary' as const },
  { name: 'Muscle Gain', kcal: '2,600–3,000', desc: 'A controlled surplus to fuel lean growth.', tone: 'secondary' as const },
  { name: 'Indian Balanced', kcal: '2,000–2,300', desc: 'Dal, roti, sabzi and curd — balanced the desi way.', tone: 'accent' as const },
  { name: 'High Protein', kcal: '2,100–2,400', desc: '2g/kg protein for recovery and satiety.', tone: 'primary' as const },
];

const foodGroups = [
  { icon: Beef, title: 'Protein', items: ['Chicken, fish, eggs', 'Paneer, tofu, tempeh', 'Lentils, Greek yogurt'] },
  { icon: Wheat, title: 'Smart carbs', items: ['Oats, brown rice, quinoa', 'Sweet potato, whole wheat', 'Fruit & legumes'] },
  { icon: Leaf, title: 'Healthy fats', items: ['Nuts & seeds', 'Olive oil, avocado', 'Fatty fish'] },
  { icon: Salad, title: 'Vegetables', items: ['Leafy greens', 'Cruciferous veg', 'Colourful peppers'] },
];

const sampleDay = {
  Vegetarian: ['Breakfast — Paneer & veg scramble, oats', 'Lunch — Rajma, brown rice, salad', 'Snack — Greek yogurt & fruit', 'Dinner — Tofu stir-fry, quinoa'],
  'Non-Veg': ['Breakfast — Eggs & whole-grain toast', 'Lunch — Grilled chicken, rice, veg', 'Snack — Cottage cheese & berries', 'Dinner — Baked fish, sweet potato'],
  Vegan: ['Breakfast — Tofu scramble, oats', 'Lunch — Chickpea & quinoa bowl', 'Snack — Hummus & veg sticks', 'Dinner — Lentil curry, brown rice'],
};

export default function Nutrition() {
  return (
    <PageTransition>
      <Seo
        title="Nutrition & Meal Plans"
        description="Science-backed nutrition: meal plans for weight loss and muscle gain, Indian, vegetarian and vegan options, a food database, macros and hydration guidance."
        path="/nutrition"
        keywords={['healthy diet', 'nutrition guide', 'Indian diet plan', 'meal plans', 'protein foods']}
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Nutrition', path: '/nutrition' },
        ])}
      />
      <PageHero
        eyebrow="Nutrition"
        title="Eat well, without the guesswork"
        subtitle="Balanced meal plans for every goal and preference, a whole-food database and practical macro guidance you can actually follow."
        crumbs={[{ label: 'Nutrition' }]}
      />

      <Section spacing="md">
        <SectionHeader align="left" eyebrow="Meal plans" title="Plans for every goal" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <Reveal key={p.name}>
              <Card interactive className="h-full p-6">
                <Badge tone={p.tone}>{p.kcal} kcal</Badge>
                <h3 className="mt-4 text-lg font-bold text-heading">{p.name}</h3>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted spacing="md">
        <SectionHeader align="left" eyebrow="Food database" title="Build meals from whole foods" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foodGroups.map((g) => (
            <Reveal key={g.title}>
              <Card className="h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                  <g.icon size={20} />
                </span>
                <h3 className="mt-4 font-bold text-heading">{g.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {g.items.map((it) => (
                    <li key={it} className="text-sm text-muted">
                      • {it}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <SectionHeader align="left" eyebrow="Sample day" title="What a balanced day looks like" />
        <div className="mt-10">
          <Tabs
            items={Object.entries(sampleDay).map(([key, meals]) => ({
              id: key,
              label: key,
              content: (
                <div className="grid gap-4 sm:grid-cols-2">
                  {meals.map((m) => (
                    <Card key={m} className="flex items-center gap-3 p-5">
                      <Apple size={18} className="shrink-0 text-primary" />
                      <span className="text-body">{m}</span>
                    </Card>
                  ))}
                </div>
              ),
            }))}
          />
        </div>
        <Card className="mt-10 flex items-start gap-3 p-6">
          <Droplets size={20} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-sm text-muted">
            <strong className="text-body">Hydration:</strong> aim for roughly 35 ml of water per kg
            of body weight, and more on training days. Use the water calculator for a personalised
            target.
          </p>
        </Card>
      </Section>
    </PageTransition>
  );
}
