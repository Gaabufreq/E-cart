import {z} from 'zod'

export const addToCartSchema = z.object({
    body: z.object({
        productId: z.string({required_error:"Product ID is required"}),
        quantity: z.number().int("Quantity must be an integer"),
    }),
});

export const updateCartQuantitySchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product ID is required' }),
    quantity: z.number().int().min(0, 'Quantity cannot be negative'),
  }),
});