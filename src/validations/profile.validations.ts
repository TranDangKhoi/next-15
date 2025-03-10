import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must be less than 50 characters" }),
});

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;
