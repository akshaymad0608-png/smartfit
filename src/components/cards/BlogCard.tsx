import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { BlogPost } from '@/types';

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <Card interactive className="flex flex-col p-0">
      <Link to={`/blog#${post.slug}`} className="flex flex-1 flex-col">
        <div className="h-44 overflow-hidden rounded-t-3xl bg-surface-muted">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-3">
            <Badge tone="primary">{post.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Clock size={13} /> {post.readMinutes} min read
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-heading">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted">
            <span className="font-medium text-body">{post.author}</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
