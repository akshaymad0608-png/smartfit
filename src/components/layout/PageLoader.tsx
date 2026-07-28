import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

/** Skeleton shown while a lazily-loaded route chunk is fetched. */
export function PageLoader() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <Skeleton className="mx-auto h-6 w-32 rounded-full" />
        <Skeleton className="mx-auto h-12 w-3/4" />
        <Skeleton className="mx-auto h-12 w-2/3" />
        <Skeleton className="mx-auto h-5 w-full" />
        <Skeleton className="mx-auto h-5 w-5/6" />
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-3xl" />
        ))}
      </div>
    </Container>
  );
}
