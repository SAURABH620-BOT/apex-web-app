import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../helpers/cn';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, isRequired, className, id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            {label}
            {isRequired && <span className="ml-1 text-apex-red-400">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            className={cn(
              'w-full rounded-xl px-4 py-2.5 text-sm transition-all duration-200 resize-y focus:outline-none border',
              error
                ? 'border-red-500 hover:border-red-500 focus:border-red-500 ring-1 ring-red-500 focus:ring-2 focus:ring-red-500/40 bg-red-950/25 text-red-100 placeholder-red-300/40 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                : 'border-slate-700/80 hover:border-slate-600 focus:border-apex-blue-500 focus:ring-2 focus:ring-apex-blue-500/50 bg-slate-900/90 text-slate-100 placeholder-slate-500',
              className
            )}
            {...props}
          />
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

TextArea.displayName = 'TextArea';
