import * as z from 'zod';
import { Product } from '@/types';
export const generateFormSchema = (
  fields: {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
    options: any[];
  }[],
  product: Product
) => {
  const schema: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'number':
        fieldSchema = z
          .number({
            invalid_type_error: `${field.label} must be at least  ${field.name === 'quantity' ? product.minimumQuantity : product.minimumWords}`,
          })
          .min(
            field.name === 'quantity'
              ? product.minimumQuantity || 0
              : product.minimumWords || 0,
            field.name === 'quantity'
              ? `${field.label} must be at least 1`
              : `Minimum purchase is ${product.minimumWords} words for this product.`
          );
        break;

      case 'text':
        fieldSchema = z
          .string({
            message: `${field.label} is required`,
          })
          .max(500, `${field.label} cannot exceed 500 characters`);
        break;

      case 'select':
        fieldSchema = z.union([z.string(), z.number()]); // Allow both string and number for select
        break;

      default:
        fieldSchema = z.string();
    }

    if (field.required) {
      if (field.type === 'number') {
        fieldSchema = (fieldSchema as z.ZodNumber).min(
          1,
          `${field.label} is required`
        );
      } else if (field.type === 'textarea' || field.type === 'text') {
        fieldSchema = (fieldSchema as z.ZodString).min(
          1,
          `${field.label} is required`
        );
      }
    }

    // Apply whitespace check for text/textarea, regardless of required
    if (field.type === 'textarea' || field.type === 'text') {
      fieldSchema = (fieldSchema as z.ZodString)
        .trim() // Trim leading/trailing spaces during parsing
        .refine((value) => value === '' || value === value.trimStart(), {
          message: `${field.label} cannot start with whitespace`,
        });
    }

    schema[field.name] = fieldSchema;
  });

  return z.object(schema);
};

export interface DynamicFormTypes {
  form: {
    _id?: string;
    productType?: string;
    fields: {
      name: string;
      label: string;
      placeholder: string;
      type: string;
      required: boolean;
      options: any[];
    }[];
    createdBy?: {
      email: string;
      isAdmin: boolean;
      name: string;
      role: string;
      _id: string;
    };
  };
}
