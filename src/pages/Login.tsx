import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/motion/PageTransition';
import { GoogleSignInButton } from '@/features/auth/GoogleSignInButton';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Seo } from '@/seo/Seo';

export default function Login() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const redirectTo = location.state?.from ?? '/dashboard';

  // If already signed in, skip the login screen.
  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  return (
    <PageTransition>
      <Seo
        title="Sign in"
        description="Sign in to SmartFit to track your progress, save plans and sync your dashboard."
        path="/login"
        noindex
      />
      <section className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

        <Container className="relative grid min-h-[80vh] place-items-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md rounded-3xl border border-line bg-card p-8 shadow-card"
          >
            <div className="flex flex-col items-center text-center">
              <Logo showWordmark={false} size={44} />
              <h1 className="mt-5 text-card-title font-bold text-heading">Welcome back</h1>
              <p className="mt-1.5 text-sm text-muted">
                Sign in to track progress, save plans and sync your dashboard.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <GoogleSignInButton onSuccess={() => navigate(redirectTo, { replace: true })} />
            </div>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-line" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted">or</span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast('Email sign-in is coming soon — use Google for now.', 'info');
              }}
              className="space-y-4"
            >
              <Input label="Email" type="email" name="email" placeholder="you@example.com" autoComplete="email" />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <Button type="submit" variant="outline" className="w-full">
                Continue with email
              </Button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={13} className="text-secondary" /> We never post to your account or
              sell your data.
            </p>
          </motion.div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </Container>
      </section>
    </PageTransition>
  );
}
