import { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input, type InputProps } from './Input';

export type PasswordInputProps = Omit<InputProps, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = 'Password', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <Input
        ref={ref}
        label={label}
        type={showPassword ? 'text' : 'password'}
        leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
        rightIcon={
          <button
            type="button"
            onClick={toggleVisibility}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 transition-colors focus:outline-none"
            title={showPassword ? 'Hide password' : 'Show password'}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
