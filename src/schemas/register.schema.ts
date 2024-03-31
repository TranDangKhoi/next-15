import { z } from "zod";
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Vui lòng nhập vào tên của bạn")
      .max(60, "Độ dài của tên chỉ được từ 1 cho tới 60 ký tự"),
    email: z
      .string()
      .email("Định dạng e-mail không hợp lệ")
      .min(1, "Vui lòng nhập vào địa chỉ e-mail của bạn"),
    password: z.string().min(6, "Mật khẩu cần có ít nhất 6 ký tự").max(100),
    confirmPassword: z
      .string()
      .min(6, "Mật khẩu xác thực cần có ít nhất 6 ký tự")
      .max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu xác thực không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type TRegisterSchema = z.infer<typeof registerSchema>;
