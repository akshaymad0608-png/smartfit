import { Clock, Flame, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Workout } from '@/types';

const diffTone = {
  Beginner: 'secondary',
  Intermediate: 'primary',
  Advanced: 'accent',
} as const;

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Card interactive className="group flex flex-col p-0">
      <Link to={`/workouts#${workout.slug}`} className="flex flex-1 flex-col">
        <div className="relative h-44 overflow-hidden rounded-t-3xl bg-surface-muted">
          <img
            src={workout.image}
            alt={`${workout.name} workout`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
          <Badge tone={diffTone[workout.difficulty]} className="absolute left-4 top-4">
            {workout.difficulty}
          </Badge>
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-card text-heading opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {workout.focus}
          </p>
          <h3 className="mt-1 text-card-title font-bold text-heading">{workout.name}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{workout.summary}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-body">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} className="text-muted" /> {workout.durationMin} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame size={15} className="text-accent" /> {workout.calories} kcal
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
