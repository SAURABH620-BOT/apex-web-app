import React from 'react';
import { cn } from '../../helpers/cn';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  gradient?: 'blue' | 'yellow' | 'red' | 'blue-yellow' | 'none';
  accent?: 'blue' | 'yellow' | 'red' | 'white';
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  gradient = 'none',
  accent,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'font-display font-bold tracking-tight';

  const sizeStyles = {
    1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight',
    2: 'text-2xl sm:text-3xl md:text-4xl font-bold leading-snug',
    3: 'text-xl sm:text-2xl md:text-3xl font-semibold leading-normal',
    4: 'text-lg sm:text-xl font-semibold'
  }[level];

  const gradientStyles = {
    none: '',
    blue: 'bg-gradient-to-r from-blue-400 via-apex-blue-500 to-indigo-300 bg-clip-text text-transparent',
    yellow: 'bg-gradient-to-r from-amber-300 via-apex-yellow-400 to-yellow-500 bg-clip-text text-transparent',
    red: 'bg-gradient-to-r from-rose-400 via-apex-red-500 to-red-600 bg-clip-text text-transparent',
    'blue-yellow': 'bg-gradient-to-r from-blue-400 via-sky-300 to-apex-yellow-400 bg-clip-text text-transparent'
  }[gradient];

  const accentStyles = accent
    ? {
        blue: 'text-apex-blue-400',
        yellow: 'text-apex-yellow-400',
        red: 'text-apex-red-500',
        white: 'text-white'
      }[accent]
    : gradient === 'none'
    ? 'text-white'
    : '';

  const Tag = `h${level}` as const;

  return React.createElement(
    Tag,
    {
      className: cn(baseStyles, sizeStyles, gradientStyles, accentStyles, className),
      ...props
    },
    children
  );
};
