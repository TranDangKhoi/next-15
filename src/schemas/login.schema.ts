import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Định dạng e-mail không hợp lệ"),
  password: z.string().min(6, "Mật khẩu cần ít nhất 6 ký tự"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
