import { useState } from 'react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type BackendErrorResponse<T extends FieldValues> = {
  message: string;
  errors?: Array<{
    type: string;
    value: string;
    msg: string;
    path: FieldPath<T>;
    location: string;
  }>;
};

export const useFormErrors = <T extends FieldValues>() => {
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [formLevelError, setFormLevelError] = useState<string>('');

  const handleFieldChange = (fieldName: string) => {
    if (apiErrors[fieldName]) {
      setApiErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
    // Clear form-level error when any field changes
    if (formLevelError) {
      setFormLevelError('');
    }
  };

  const extractApiErrors = (error: unknown): {
    fieldErrors: Record<string, string>;
    formError: string;
  } => {
    const result = {
      fieldErrors: {} as Record<string, string>,
      formError: ''
    };

    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<BackendErrorResponse<T>>;
      
      // Handle both error formats in one check
      if (axiosError.response?.data) {
        // Handle field-level errors if they exist
        if (axiosError.response.data.errors) {
          result.fieldErrors = axiosError.response.data.errors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {} as Record<string, string>);
        }
        
        // Always capture the message (works for both formats)
        result.formError = axiosError.response.data.message;
      }
    } else if (error instanceof Error) {
      result.formError = error.message;
    }

    return result;
  };

  const handleApiError = (error: unknown, defaultMessage = 'Validation failed') => {
    const { fieldErrors, formError } = extractApiErrors(error);
    
    setApiErrors(fieldErrors);
    setFormLevelError(formError);
    
    // Show either the first field error or the form-level error
    const errorToShow = Object.values(fieldErrors)[0] || formError || defaultMessage;
    
    if (errorToShow) {
      toast.error(errorToShow);
    }
    
    return { fieldErrors, formError };
  };

  const clearAllErrors = () => {
    setApiErrors({});
    setFormLevelError('');
  };

  const getFieldError = (fieldName: string) => apiErrors[fieldName] || '';

  const registerWithErrorHandling = (form: UseFormReturn<T>, name: FieldPath<T>) => {
    return {
      ...form.register(name, {
        onChange: () => handleFieldChange(name as string)
      }),
      error: form.formState.errors[name]?.message || apiErrors[name as string]
    };
  };

  return {
    apiErrors,
    formLevelError,
    handleFieldChange,
    extractApiErrors,
    handleApiError,
    clearAllErrors,
    getFieldError,
    registerWithErrorHandling
  };
};