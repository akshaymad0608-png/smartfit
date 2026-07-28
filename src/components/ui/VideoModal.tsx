import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title?: string;
}

/** Lightweight video player modal. The video only loads when opened. */
export function VideoModal({ open, onClose, src, poster, title }: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'Video preview'}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-950 shadow-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <X size={18} />
            </button>
            <video
              key={src}
              className="aspect-video w-full bg-black"
              src={src}
              poster={poster}
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
