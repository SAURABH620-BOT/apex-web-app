import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, AlertCircle, X } from 'lucide-react';
import { cn } from '../../helpers/cn';

export interface DatePickerProps {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string; // Format: YYYY-MM-DD
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onBlur?: (e: { target: { name?: string } }) => void;
  placeholder?: string;
  isRequired?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  minYear?: number;
  maxYear?: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  error,
  helperText,
  value = '',
  onChange,
  onBlur,
  placeholder = 'Select date (DD/MM/YYYY)',
  isRequired,
  disabled = false,
  className,
  id,
  name,
  minYear = 1960,
  maxYear = 2035
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pickerId = id || (label ? `datepicker-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  // Parse initial value or default to current date
  const parsedDate = useMemo(() => {
    if (!value) return null;
    const parts = value.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    return null;
  }, [value]);

  // Current view in the calendar (year and month)
  const [viewYear, setViewYear] = useState<number>(() => parsedDate ? parsedDate.getFullYear() : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(() => parsedDate ? parsedDate.getMonth() : new Date().getMonth());

  // Sync view when value changes from outside
  useEffect(() => {
    if (parsedDate) {
      setViewYear(parsedDate.getFullYear());
      setViewMonth(parsedDate.getMonth());
    }
  }, [parsedDate]);

  // Click outside listener
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

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOpen = () => {
    if (disabled) return;
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState) {
      onBlur?.({ target: { name } });
    }
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMonth(parseInt(e.target.value, 10));
  };

  // Generate calendar days for current month view
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

    // Previous month padding days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, isCurrentMonth: false, dateStr });
    }

    // Current month days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ day, isCurrentMonth: true, dateStr });
    }

    // Next month padding days to complete 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({ day: i, isCurrentMonth: false, dateStr });
    }

    return days;
  }, [viewYear, viewMonth]);

  const handleSelectDay = (dateStr: string) => {
    onChange?.({ target: { value: dateStr, name } });
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange?.({ target: { value: dateStr, name } });
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.({ target: { value: '', name } });
  };

  // Formatted date string for display
  const displayFormattedDate = useMemo(() => {
    if (!parsedDate) return '';
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = MONTH_NAMES[parsedDate.getMonth()].slice(0, 3);
    const year = parsedDate.getFullYear();
    return `${day} ${month} ${year}`;
  }, [parsedDate]);

  // Year list for fast jump dropdown
  const yearsList = useMemo(() => {
    const list: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      list.push(y);
    }
    return list;
  }, [minYear, maxYear]);

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  return (
    <div className="w-full space-y-1.5 text-left relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={pickerId}
          onClick={toggleOpen}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300 cursor-pointer select-none"
        >
          {label}
          {isRequired && <span className="ml-1 text-apex-red-400">*</span>}
        </label>
      )}

      {/* Input Trigger Field */}
      <button
        id={pickerId}
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        aria-haspopup="dialog"
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
        <div className="flex items-center gap-2.5 truncate">
          <CalendarIcon
            className={cn(
              'w-4 h-4 shrink-0 transition-colors',
              error ? 'text-red-400' : isOpen ? 'text-apex-yellow-400' : 'text-slate-400'
            )}
          />
          <span className={cn('truncate', !parsedDate && 'text-slate-500')}>
            {parsedDate ? displayFormattedDate : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {parsedDate && !disabled && (
            <span
              onClick={handleClear}
              title="Clear date"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          {error && <AlertCircle className="w-4 h-4 text-red-400" />}
        </div>
      </button>

      {/* Floating Custom Calendar Modal Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Calendar date picker"
          className="absolute left-0 top-full mt-2 rounded-2xl bg-slate-900/98 backdrop-blur-2xl border border-slate-700/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 z-50 w-72 sm:w-80 animate-fadeIn select-none ring-1 ring-white/10"
        >
          {/* Header Controls: Month & Year Selectors with Arrows */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {/* Month Selector */}
              <select
                value={viewMonth}
                onChange={handleMonthChange}
                aria-label="Select month"
                className="bg-slate-800/90 text-white text-xs font-bold py-1 px-2 rounded-lg border border-slate-700 focus:outline-none focus:border-apex-yellow-400 cursor-pointer"
              >
                {MONTH_NAMES.map((m, idx) => (
                  <option key={idx} value={idx} className="bg-slate-900 text-slate-200">
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Selector (Instant Year Jump) */}
              <select
                value={viewYear}
                onChange={handleYearChange}
                aria-label="Select year"
                className="bg-slate-800/90 text-white text-xs font-bold py-1 px-2 rounded-lg border border-slate-700 focus:outline-none focus:border-apex-yellow-400 cursor-pointer font-mono"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y} className="bg-slate-900 text-slate-200">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Labels Grid */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEKDAY_NAMES.map((weekday, idx) => (
              <span
                key={idx}
                className={cn(
                  'text-[10px] font-bold uppercase py-1',
                  idx === 0 ? 'text-apex-red-400' : 'text-slate-400'
                )}
              >
                {weekday}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => {
              const isSelected = item.dateStr === value;
              const isToday = item.dateStr === todayStr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectDay(item.dateStr)}
                  className={cn(
                    'h-8 text-xs font-medium rounded-xl transition-all flex items-center justify-center cursor-pointer focus:outline-none',
                    isSelected
                      ? 'bg-apex-yellow-400 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105'
                      : item.isCurrentMonth
                      ? 'text-slate-100 hover:bg-slate-800 hover:text-apex-yellow-400'
                      : 'text-slate-600 hover:bg-slate-800/50 hover:text-slate-400',
                    isToday && !isSelected && 'ring-1 ring-apex-blue-400 font-bold text-apex-blue-300'
                  )}
                >
                  {item.day}
                </button>
              );
            })}
          </div>

          {/* Footer Quick Actions */}
          <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-apex-blue-400 hover:text-apex-yellow-400 font-semibold cursor-pointer transition-colors"
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
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
