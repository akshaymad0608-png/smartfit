import { Calendar, Check, Target } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Program } from '@/types';

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Card
      interactive
      className={`flex flex-col p-6 ${program.featured ? 'ring-1 ring-primary/30' : ''}`}
    >
      <div className="flex items-center justify-between">
        <Badge tone={program.featured ? 'primary' : 'neutral'}>{program.level}</Badge>
        {program.featured && <span className="text-xs font-bold text-primary">Popular</span>}
      </div>

      <h3 className="mt-4 text-card-title font-bold text-heading">{program.title}</h3>
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
    </Card>
  );
}
