import {z} from 'zod'

export const addToCartSchema = z.object({
    body: z.object({
        productId: z.string({required_error:"Product ID is required"}),
        quantity: z.number().min(1,"Quantity must be at least 1").optional(),
    }),
});