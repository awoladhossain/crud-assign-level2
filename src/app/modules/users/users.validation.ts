import { z } from 'zod'

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

// Define a Zod schema for the order
export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

// Define the main Zod schema for the user
export const userSchemaZod = z.object({
  userId: z.number(),
  username: z.string().max(20),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().max(20),
    lastName: z.string().max(20),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(false),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
})
