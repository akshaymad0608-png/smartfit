import { cn } from '@/lib/cn';
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

const fieldBase =
  'w-full rounded-2xl border border-line bg-card px-4 py-3 text-body placeholder:text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  suffix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, suffix, className, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-heading">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(fieldBase, error && 'border-red-400 focus:ring-red-300', suffix && 'pr-14', className)}
          {...rest}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted">
            {suffix}
          </span>
        )}
      </div>
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-heading">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={fieldId}
        aria-invalid={!!error}
        className={cn(fieldBase, 'min-h-32 resize-y', error && 'border-red-400', className)}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
});
