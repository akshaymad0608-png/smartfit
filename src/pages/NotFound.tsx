import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PageTransition } from '@/components/motion/PageTransition';
import { Seo } from '@/seo/Seo';

export default function NotFound() {
  return (
    <PageTransition>
      <Seo title="Page not found" description="The page you're looking for doesn't exist." path="/404" noindex />
      <Container className="grid min-h-[70vh] place-items-center py-20 text-center">
        <div className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex items-baseline justify-center gap-2"
          >
            <span className="text-[8rem] font-extrabold leading-none text-gradient">4</span>
            <motion.span
              className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Search size={44} />
            </motion.span>
            <span className="text-[8rem] font-extrabold leading-none text-gradient">4</span>
          </motion.div>

          <h1 className="mt-6 text-section font-extrabold text-heading">Lost your rhythm?</h1>
          <p className="mt-3 text-body">
            We couldn't find that page. It may have moved, or the link might be broken. Let's get you
            back on track.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button as="link" to="/" leftIcon={<Home size={16} />}>
              Back to home
            </Button>
            <Button as="link" to="/workouts" variant="outline">
              Browse workouts
            </Button>
          </div>
        </div>
      </Container>
    </PageTransition>
  );
}
