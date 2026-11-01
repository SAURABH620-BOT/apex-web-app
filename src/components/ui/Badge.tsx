import React from 'react';
import { cn } from '../../helpers/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  isPill?: boolean;
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  size = 'md',
  isPill = true,
  leftIcon,
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold'
  }[size];

  const variantStyles = {
    blue: 'bg-apex-blue-950/80 text-apex-blue-300 border border-apex-blue-500/40 shadow-sm shadow-apex-blue-900/30',
    yellow: 'bg-amber-950/80 text-apex-yellow-300 border border-amber-400/50 shadow-sm shadow-amber-900/30',
    red: 'bg-red-950/80 text-apex-red-300 border border-apex-red-500/40 shadow-sm shadow-red-900/30',
    green: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-900/30',
    purple: 'bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-900/30',
    slate: 'bg-slate-800/90 text-slate-300 border border-slate-700'
  }[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center tracking-wide uppercase select-none transition-colors duration-150',
        isPill ? 'rounded-full' : 'rounded-lg',
        sizeStyles,
        variantStyles,
        className
      )}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
    </span>
  );
};
