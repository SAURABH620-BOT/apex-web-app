import { useState, useCallback } from 'react';
import type { ValidationResult } from '../helpers/validationRules';

export type ValidationSchema<T> = {
  [K in keyof T]?: (value: T[K], allValues: T) => ValidationResult;
};

export interface UseFormValidationReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (name: keyof T, value: unknown) => void;
  handleBlur: (name: keyof T) => void;
  setFieldValue: (name: keyof T, value: unknown) => void;
  setFieldError: (name: keyof T, error: string | undefined) => void;
  validateField: (name: keyof T) => boolean;
  validateAll: () => boolean;
  getFirstInvalidField: (fieldOrder: (keyof T)[]) => keyof T | null;
  resetForm: (newValues?: Partial<T>) => void;
  setIsSubmitting: (submitting: boolean) => void;
}

export function useFormValidation<T extends object>(
  initialValues: T,
  schema: ValidationSchema<T>
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, customValue?: unknown): boolean => {
      const validator = schema[name];
      if (!validator) return true;

      const val = customValue !== undefined ? customValue : values[name];
      const result = validator(val as T[keyof T], values);

      if (!result.isValid && result.error) {
        setErrors((prev) => ({ ...prev, [name]: result.error }));
        return false;
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
        return true;
      }
    },
    [schema, values]
  );

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    let formIsValid = true;
    const newErrors: Partial<Record<keyof T, string>> = {};
    const newTouched: Partial<Record<keyof T, boolean>> = {};

    for (const key in schema) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        const k = key as keyof T;
        newTouched[k] = true;
        const validator = schema[k];
        if (validator) {
          const result = validator(values[k], values);
          if (!result.isValid && result.error) {
            newErrors[k] = result.error;
            formIsValid = false;
          }
        }
      }
    }

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors(newErrors);
    return formIsValid;
  }, [schema, values]);

  // Find the first field that fails validation based on visual field order
  const getFirstInvalidField = useCallback(
    (fieldOrder: (keyof T)[]): keyof T | null => {
      for (const key of fieldOrder) {
        const validator = schema[key];
        if (validator) {
          const result = validator(values[key], values);
          if (!result.isValid) {
            return key;
          }
        }
      }
      return null;
    },
    [schema, values]
  );

  // Handle value change
  const handleChange = useCallback(
    (name: keyof T, value: unknown) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        return next;
      });

      // If already touched, validate on the fly
      if (touched[name]) {
        const validator = schema[name];
        if (validator) {
          const result = validator(value as T[keyof T], { ...values, [name]: value });
          setErrors((prev) => {
            const next = { ...prev };
            if (!result.isValid && result.error) {
              next[name] = result.error;
            } else {
              delete next[name];
            }
            return next;
          });
        }
      }
    },
    [schema, touched, values]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name);
    },
    [validateField]
  );

  const setFieldValue = useCallback((name: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  }, []);

  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      setValues(newValues ? { ...initialValues, ...newValues } : initialValues);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
    },
    [initialValues]
  );

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    validateField,
    validateAll,
    getFirstInvalidField,
    resetForm,
    setIsSubmitting
  };
}
