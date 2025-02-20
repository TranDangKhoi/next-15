## 1. Chú ý về việc sử dụng biến môi trường trong project NextJS

Khi ta sử dụng biến môi trường trong NextJS mà đặt tên không có tiền tố `NEXT_PUBLIC` thì biến môi trường đó sẽ chỉ sử dụng được ở phía Server

VÀ VÌ LÝ DO TRÊN NÊN TA PHẢI THÊM LƯU Ý NỮA: Đó chính là `process.env` có hành vi khác nhau giữa server và client. Khi muốn lấy ra được value của các biến môi trường ở phía client thì ta phải "chấm" tới cuối, ví dụ:

```tsx
// ❌ Wrong way (this will return an empty object):
"use client";
const myNextEnvinronmentVariables = process.env;

// ✅ Right way (this will return the value of that env variable):
("use client");
const myNextPublicAPI = process.env.NEXT_PUBLIC_API;
```

## 2. Tính năng thử nghiệm use cache

Mặc định khi ta gọi "use cache" ở đầu file hoặc ở đầu mỗi function thì mặc định function đó sẽ chạy ở phía Server
