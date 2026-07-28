import { motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { primaryNav } from '@/config/site';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

type Entry = { label: string; href: string; group: string };

const quickLinks: Entry[] = [
  { label: 'BMI Calculator', href: '/calculators#bmi', group: 'Calculators' },
  { label: 'TDEE Calculator', href: '/calculators#tdee', group: 'Calculators' },
  { label: 'Macro Calculator', href: '/calculators#macros', group: 'Calculators' },
  { label: 'AI Workout Generator', href: '/ai-coach', group: 'AI Coach' },
  { label: '30-Day Challenge', href: '/programs', group: 'Programs' },
];

/** Lightweight global search / command palette. */
export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const entries: Entry[] = useMemo(() => {
    const nav = primaryNav.flatMap((item) => [
      { label: item.label, href: item.href, group: 'Pages' },
      ...(item.children ?? []).map((c) => ({ label: c.label, href: c.href, group: item.label })),
    ]);
    return [...nav, ...quickLinks];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 7);
    return entries.filter((e) => e.label.toLowerCase().includes(q)).slice(0, 8);
  }, [entries, query]);

  const go = (href: string) => {
    onClose();
    setQuery('');
    navigate(href);
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-xl p-0">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <Search size={20} className="text-muted" aria-hidden />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && results[0] && go(results[0].href)}
          placeholder="Search workouts, calculators, nutrition…"
          aria-label="Search the site"
          className="w-full bg-transparent text-body placeholder:text-muted focus:outline-none"
        />
      </div>
      <ul className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-muted">No results for “{query}”.</li>
        )}
        {results.map((e) => (
          <li key={e.href + e.label}>
            <button
              onClick={() => go(e.href)}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-muted"
            >
              <span>
                <span className="font-medium text-heading">{e.label}</span>
                <span className="ml-2 text-xs text-muted">{e.group}</span>
              </span>
              <CornerDownLeft size={15} className="text-muted opacity-0 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>
      <motion.p className="border-t border-line px-5 py-3 text-xs text-muted">
        Press <kbd className="rounded bg-surface-muted px-1.5 py-0.5 font-sans">Enter</kbd> to open
        the first result.
      </motion.p>
    </Modal>
  );
}
