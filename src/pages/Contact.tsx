import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Accordion } from '@/components/ui/Accordion';
import { PageTransition } from '@/components/motion/PageTransition';
import { useToast } from '@/contexts/ToastContext';
import { Seo } from '@/seo/Seo';
import { breadcrumbSchema } from '@/seo/schema';
import { site } from '@/config/site';
import { faqs } from '@/data/content';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  subject: z.string().min(3, 'Please add a subject.'),
  message: z.string().min(10, 'Please add a little more detail.'),
});
type FormValues = z.infer<typeof schema>;

const details = [
  { icon: Mail, label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: Phone, label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phone}` },
  { icon: MapPin, label: 'Address', value: site.contact.address },
  { icon: Clock, label: 'Hours', value: site.contact.hours },
];

export default function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    toast(`Thanks ${values.name.split(' ')[0]}, we'll be in touch soon!`, 'success');
    reset();
  };

  return (
    <PageTransition>
      <Seo
        title="Contact"
        description="Get in touch with the FitSmart team — questions, feedback, partnerships and support."
        path="/contact"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Questions, feedback or partnership ideas — reach out and a real human will get back to you."
        crumbs={[{ label: 'Contact' }]}
      />

      <Section spacing="md">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map((d) => (
                <Card key={d.label} className="p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <d.icon size={18} />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a href={d.href} className="mt-0.5 block font-medium text-heading hover:text-primary">
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium text-heading">{d.value}</p>
                  )}
                </Card>
              ))}
            </div>
            <Card className="overflow-hidden p-0">
              <div
                className="grid h-56 place-items-center bg-gradient-to-br from-primary/15 to-secondary/15"
                role="img"
                aria-label="Map location placeholder"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-body shadow-soft">
                  <MapPin size={15} className="text-primary" /> Austin, TX
                </span>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="Name" {...register('name')} error={errors.name?.message} />
                <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
              </div>
              <Input label="Subject" {...register('subject')} error={errors.subject?.message} />
              <Textarea label="Message" rows={5} {...register('message')} error={errors.message?.message} />
              <Button type="submit" disabled={isSubmitting} rightIcon={<Send size={16} />}>
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          </Card>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-center text-section font-extrabold text-heading">
            Frequently asked
          </h2>
          <Accordion items={faqs.slice(0, 4)} />
        </div>
      </Section>
    </PageTransition>
  );
}
