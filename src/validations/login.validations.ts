import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid e-mail address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
