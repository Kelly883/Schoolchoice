import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        {
          'badge-primary': variant === 'primary',
          'badge-secondary': variant === 'secondary',
          'badge-success': variant === 'success',
          'badge-warning': variant === 'warning',
          'badge-error': variant === 'error',
          'bg-neutral-100 text-neutral-700': variant === 'neutral',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
