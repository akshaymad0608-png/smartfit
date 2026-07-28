import { Star } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import type { Testimonial } from '@/types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? 'fill-accent text-accent' : 'text-line'}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-body">“{testimonial.quote}”</blockquote>
      <div className="mt-6 flex items-center gap-3">
        <Avatar initials={testimonial.initials} src={testimonial.photo} name={testimonial.name} />
        <div>
          <p className="font-semibold text-heading">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  );
}
