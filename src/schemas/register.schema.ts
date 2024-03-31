"use client";

import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập vào tên của bạn")
    .max(60, "Độ dài của tên chỉ được từ 1 cho tới 60 ký tự"),
  email: z
    .string()
    .email("Định dạng e-mail không hợp lệ")
    .min(1, "Vui lòng nhập vào địa chỉ e-mail của bạn"),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
