import {z} from 'zod'

export const checkoutSchema = z.object({
    body:z.object({
        shippingAddress: z.object({
        street:z.string({required_error:"Street address is required"}),
        city: z.string({required_error:"City is required"}),
        state: z.string({required_error:"State is required"}),
        zipCode: z.string({required_error:"Zip code is required"}),
        country: z.string({required_error:"Country is required"})
        }),
    }),
});

export const verifyPaymentSchema = z.object({
    body: z.object({
        razorpayOrderId: z.string({required_error:"Razorpay Order ID is required"}),
        razorpayPaymentId: z.string({required_error:"Razorpay Payment ID is required"}),
        razorpaySignature: z.string({required_error:"Razorpay Signature is required"})
    }),
});