import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      className={cn('spinner', {
        'w-4 h-4': size === 'sm',
        'w-6 h-6': size === 'md',
        'w-8 h-8': size === 'lg',
      }, className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner size="lg" />
    </div>
  );
}
