import { Calendar, Check, Target } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Program } from '@/types';

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card
      interactive
      className={`group flex flex-col overflow-hidden p-0 ${
        program.featured ? 'ring-1 ring-primary/30' : ''
      }`}
    >
      <div className="relative h-44 overflow-hidden bg-surface-muted">
        <img
          src={program.image}
          alt={`${program.title} program`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
        <Badge tone={program.featured ? 'primary' : 'neutral'} className="absolute left-4 top-4">
          {program.level}
        </Badge>
        {program.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-card px-2.5 py-1 text-xs font-bold text-primary shadow-soft">
            Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-card-title font-bold text-heading">{program.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{program.summary}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-body">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={15} className="text-muted" /> {program.weeks} weeks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Target size={15} className="text-muted" /> {program.daysPerWeek}×/week
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {program.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-body">
              <Check size={16} className="mt-0.5 shrink-0 text-secondary" /> {h}
            </li>
          ))}
        </ul>

        <Button as="link" to="/programs" variant="outline" className="mt-6 w-full">
          View program
        </Button>
      </div>
    </Card>
  );
}
