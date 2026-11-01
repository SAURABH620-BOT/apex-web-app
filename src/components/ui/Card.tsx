import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../helpers/cn';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'solid' | 'interactive' | 'glow-blue' | 'glow-yellow' | 'glow-red';
  padded?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'glass',
  padded = true,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300 relative overflow-hidden';

  const variantStyles = {
    glass: 'bg-slate-900/70 backdrop-blur-md border border-slate-800/80 shadow-xl',
    solid: 'bg-slate-900 border border-slate-800 shadow-xl',
    interactive:
      'bg-slate-900/80 backdrop-blur-md border border-slate-800/80 hover:border-apex-blue-500/50 hover:bg-slate-900/95 hover:-translate-y-1 hover:shadow-2xl hover:shadow-apex-blue-900/30 cursor-pointer',
    'glow-blue':
      'bg-slate-900/85 backdrop-blur-md border border-apex-blue-500/30 shadow-glow-blue',
    'glow-yellow':
      'bg-slate-900/85 backdrop-blur-md border border-amber-500/30 shadow-glow-yellow',
    'glow-red':
      'bg-slate-900/85 backdrop-blur-md border border-red-500/30 shadow-glow-red'
  }[variant];

  return (
    <motion.div
      className={cn(baseStyles, variantStyles, padded ? 'p-6 sm:p-7' : '', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
