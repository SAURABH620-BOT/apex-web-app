import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../helpers/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, isRequired, className, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            {label}
            {isRequired && <span className="ml-1 text-apex-red-400">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-xl px-4 py-2.5 text-sm transition-all duration-200 focus:outline-none border',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error
                ? 'border-red-500 hover:border-red-500 focus:border-red-500 ring-1 ring-red-500 focus:ring-2 focus:ring-red-500/40 bg-red-950/25 text-red-100 placeholder-red-300/40 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                : 'border-slate-700/80 hover:border-slate-600 focus:border-apex-blue-500 focus:ring-2 focus:ring-apex-blue-500/50 bg-slate-900/90 text-slate-100 placeholder-slate-500',
              className
            )}
            {...props}
          />

          {rightIcon && !error && (
            <div className="absolute right-3.5 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}

          {error && !rightIcon && (
            <div className="absolute right-3.5 flex items-center text-apex-red-400 pointer-events-none">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error ? (
          <p className="flex items-center gap-1.5 text-xs text-apex-red-400 font-medium mt-1 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
