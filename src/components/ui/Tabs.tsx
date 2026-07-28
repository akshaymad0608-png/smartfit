import { motion } from 'framer-motion';
import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const groupId = useId();

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface-muted p-1"
      >
        {items.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`${groupId}-${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${groupId}-${tab.id}-panel`}
              onClick={() => setActive(tab.id)}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                selected ? 'text-white' : 'text-body hover:text-heading',
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${groupId}-pill`}
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {items.map(
        (tab) =>
          tab.id === active && (
            <motion.div
              key={tab.id}
              role="tabpanel"
              id={`${groupId}-${tab.id}-panel`}
              aria-labelledby={`${groupId}-${tab.id}-tab`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {tab.content}
            </motion.div>
          ),
      )}
    </div>
  );
}
