import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { cn } from '../../helpers/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectDropdownProps {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onBlur?: (e: { target: { name?: string } }) => void;
  placeholder?: string;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  error,
  helperText,
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select an option',
  isRequired,
  disabled = false,
  className,
  id,
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          onBlur?.({ target: { name } });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur, name]);

  // Handle keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled || disabled) return;
    onChange?.({ target: { value: option.value, name } });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (disabled) return;
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState) {
      onBlur?.({ target: { name } });
    }
  };

  return (
    <div className="w-full space-y-1.5 text-left relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={dropdownId}
          onClick={toggleDropdown}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 cursor-pointer select-none"
        >
          {label}
          {isRequired && <span className="ml-1 text-apex-red-400">*</span>}
        </label>
      )}

      {/* Custom Trigger Button */}
      <button
        id={dropdownId}
        type="button"
        disabled={disabled}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'w-full rounded-xl px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer flex items-center justify-between text-left focus:outline-none border',
          error
            ? 'border-red-500 hover:border-red-500 focus:border-red-500 ring-1 ring-red-500 focus:ring-2 focus:ring-red-500/40 bg-red-950/25 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
            : isOpen
            ? 'border-apex-blue-500 ring-2 ring-apex-blue-500/50 bg-slate-900/90 text-slate-100'
            : 'border-slate-700/80 hover:border-slate-600 focus:border-apex-blue-500 focus:ring-2 focus:ring-apex-blue-500/50 bg-slate-900/90 text-slate-100',
          disabled && 'opacity-60 cursor-not-allowed bg-slate-950',
          className
        )}
      >
        <span className={cn('truncate', !selectedOption && 'text-slate-500')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {error && <AlertCircle className="w-4 h-4 text-red-400" />}
          <ChevronDown
            className={cn(
              'w-4 h-4 text-slate-400 transition-transform duration-200',
              isOpen && 'rotate-180 text-apex-yellow-400'
            )}
          />
        </div>
      </button>

      {/* Floating Custom Popup Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 rounded-2xl bg-slate-900/98 backdrop-blur-2xl border border-slate-700/90 shadow-2xl p-1.5 z-50 max-h-64 overflow-y-auto animate-fadeIn divide-y divide-slate-800/40"
        >
          {options.length === 0 ? (
            <div className="py-3 px-4 text-xs text-slate-400 text-center">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    'w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer select-none',
                    option.disabled && 'opacity-40 cursor-not-allowed',
                    isSelected
                      ? 'bg-apex-blue-900/40 text-apex-yellow-400 font-semibold border border-apex-blue-500/30'
                      : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                  )}
                >
                  <span className="truncate pr-2">{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-apex-yellow-400 shrink-0" />}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Validation Error / Helper Text */}
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
};
