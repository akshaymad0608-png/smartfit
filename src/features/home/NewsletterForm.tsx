import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

const schema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});
type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    // Simulated subscribe — swap for a real API call when the backend lands.
    await new Promise((res) => setTimeout(res, 500));
    toast(`You're subscribed, ${values.email.split('@')[0]}!`, 'success');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            className="w-full rounded-full border border-line bg-surface px-5 py-3 text-body placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            {...register('email')}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} rightIcon={<ArrowRight size={16} />}>
          {isSubmitting ? 'Joining…' : 'Subscribe'}
        </Button>
      </div>
      {errors.email && <p className="mt-2 text-xs font-medium text-red-500">{errors.email.message}</p>}
    </form>
  );
}
