import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.preprocess((val) => Number(val), z.number().positive('Price must be a positive number')),
    category: z.string().min(1, 'Category is required'),
    stock: z.preprocess((val) => Number(val), z.number().int().nonnegative('Stock must be 0 or greater')),
  }),
});