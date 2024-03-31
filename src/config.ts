// Chúng ta có thể sử dụng zod để validate các giá trị trong file env

import { z } from "zod";
const envSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);

const parsedEnvConfig = envSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
console.log(parsedEnvConfig);
if (!parsedEnvConfig.success) {
  console.error(parsedEnvConfig.error.issues);
  throw new Error("Các giá trị khai báo trong file .env không hợp lệ");
}

const parsedEnvData = parsedEnvConfig.data;
export default parsedEnvData;
