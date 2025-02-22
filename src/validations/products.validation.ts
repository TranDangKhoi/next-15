import { z } from "zod";

export const addProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must not exceed 100 characters"),
  price: z.number().min(1, "Price must be at least 1"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1500, "Description must not exceed 1500 characters"),
  image: z.any(),
});

export type TAddProductSchema = z.infer<typeof addProductSchema>;
