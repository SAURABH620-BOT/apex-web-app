import React from 'react';
import { cn } from '../../helpers/cn';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'muted' | 'body' | 'highlight' | 'danger' | 'accent';
  as?: 'p' | 'span' | 'div';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  size = 'md',
  variant = 'body',
  as = 'p',
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed'
  }[size];

  const variantStyles = {
    muted: 'text-slate-400',
    body: 'text-slate-300',
    highlight: 'text-apex-yellow-300 font-medium',
    danger: 'text-apex-red-400',
    accent: 'text-apex-blue-300 font-medium'
  }[variant];

  const Component = as;

  return (
    <Component className={cn(sizeStyles, variantStyles, className)} {...props}>
      {children}
    </Component>
  );
};
