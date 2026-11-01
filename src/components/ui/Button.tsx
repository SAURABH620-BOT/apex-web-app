import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../helpers/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'yellow' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-apex-blue-600 to-apex-blue-700 hover:from-apex-blue-500 hover:to-apex-blue-600 text-white shadow-lg shadow-apex-blue-900/40 hover:shadow-apex-blue-600/30 focus:ring-apex-blue-500 border border-apex-blue-500/30',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 hover:border-slate-600 focus:ring-slate-500 shadow-sm',
    yellow:
      'bg-gradient-to-r from-apex-yellow-400 to-amber-500 hover:from-apex-yellow-300 hover:to-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:shadow-apex-yellow-400/40 focus:ring-apex-yellow-400 border border-amber-400/40',
    danger:
      'bg-gradient-to-r from-apex-red-600 to-red-700 hover:from-apex-red-500 hover:to-apex-red-600 text-white shadow-lg shadow-red-900/40 focus:ring-apex-red-500 border border-red-500/30',
    outline:
      'bg-transparent hover:bg-apex-blue-950/40 text-apex-blue-300 hover:text-white border border-apex-blue-500/50 hover:border-apex-blue-400 focus:ring-apex-blue-500',
    ghost:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border-transparent focus:ring-slate-500'
  }[variant];

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles,
        variantStyles,
        fullWidth ? 'w-full' : '',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
