import { useState, useCallback } from 'react';

type Validator = (value: string) => string | null;

export const useFormValidation = (validators: { [key: string]: Validator }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const validate = useCallback(() => {
    const newErrors: { [key: string]: string | null } = {};
    let isValid = true;
    for (const key in validators) {
      const error = validators[key](values[key] || '');
      newErrors[key] = error;
      if (error) {
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  }, [values, validators]);

  const handleChange = useCallback((key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  return { values, errors, handleChange, validate };
};
