## 1. Cookies là gì?

Hãy tưởng tượng bạn bước vào Highlands Nhà Hát Lớn. Sau khi order một cốc Cappuccino, nhân viên đưa cho bạn một chiếc thẻ rung và bảo bạn mang theo.

Thẻ rung này chứa một **mã định danh duy nhất** liên kết với đơn hàng của bạn. Khi thẻ rung kêu và bạn quay lại quầy, nhân viên chỉ cần kiểm tra mã trên thẻ để biết:

- Bạn chính là chủ nhân của cốc Cappuccino đó.
- Họ không cần hỏi lại bạn đã gọi món gì.

Như vậy, thẻ rung không lưu trực tiếp thông tin về cốc Cappuccino, mà chỉ là "chìa khóa" để nhân viên tra cứu xem ai là chủ nhân của cốc Cappuccino trên hệ thống.

=> Giống như cookies không lưu toàn bộ thông tin cá nhân, mà thường chỉ chứa một **mã định danh duy nhất** _(hay mấy ông dev còn gọi là token)_ để server xác thực.

## 2. Ý nghĩa của từng trường trong Cookies

Cookies sẽ khó hiểu hơn một chút so với Local Storage hay Session Storage, nhưng mà chúng ta vẫn sẽ tìm hiểu dần dần. Bắt đầu từ việc hiểu về ý nghĩa của từng key trong Cookies:

| Tên Trường         | Ý nghĩa                                                                                |
| ------------------ | -------------------------------------------------------------------------------------- |
| Name               | Tên của cookie                                                                         |
| Value              | Giá trị của cookie                                                                     |
| Domain             | Domain mà cookie thuộc về _(ví dụ: client.com)_. Cookie chỉ hoạt động trên domain này. |
| Path               | Đường dẫn URL mà cookie có hiệu lực _(ví dụ: /dashboard)_                              |
| Max-Age            | Thời gian sống của cookie tính bằng giây                                               |
| Size               | Dung lượng của cookie _(bao gồm cả tên và giá trị)_                                    |
| HttpOnly           | Nếu true, cookie chỉ có thể truy cập từ phía server, không thể bị đọc bởi JavaScript.  |
| Secure             | Nếu true, cookie chỉ được gửi qua kết nối HTTPS                                        |
| SameSite           | Quy định cách cookie được gửi kèm theo các request cross-site:                         |
|                    | - `Strict`: Chỉ cho phép trong cùng domain                                             |
|                    | - `Lax`: Gửi cookie trong một số request GET                                           |
|                    | - `None`: Gửi cookie giữa các domain khác nhau (phải có `Secure`).                     |
| CrossSite          | Cho biết cookie có hoạt động giữa các domain khác nhau hay không                       |
| Partition Key Site | Gắn cookie với từng site riêng biệt (nếu trình duyệt hỗ trợ)                           |

## 3. Dung lượng tối đa của Cookies

- Dung lượng tối đa:

  - Một cookie: ~4KB (bao gồm cả tên, giá trị, và metadata).
  - Tổng dung lượng cookies cho mỗi domain: ~4MB.
  - Số lượng cookie tối đa cho mỗi domain: ~20-50 cookies (tùy trình duyệt).

- Cookies thường lưu gì?

  - Session token (JWT, Session ID...).
  - Các tuỳ chỉnh người dùng (Theme, ngôn ngữ).

  - Thông tin tạm thời cần server xử lý.

## 4. Sự khác biệt giữa ba thằng Local Storage, Session Storage và Cookies

| Đặc điểm               | Cookies                                                   | Local Storage                                | Session Storage                   |
| ---------------------- | --------------------------------------------------------- | -------------------------------------------- | --------------------------------- |
| **Kích thước**         | ~4KB mỗi cookie, ~4MB tổng cho domain                     | ~5-10MB                                      | ~5-10MB                           |
| **Thời gian tồn tại**  | Có thể cấu hình (`Max-Age`, `Expires`) hoặc theo session  | Tồn tại lâu dài, không hết hạn.              | Hết hạn khi đóng tab/trình duyệt. |
| **Truy cập từ server** | **Có**: Cookie được gửi tự động đến server trong request. | **Không**: Chỉ lưu trên client.              | **Không**: Chỉ lưu trên client.   |
| **Truy cập từ client** | Có thể bị hạn chế bằng `HttpOnly`                         | Dễ dàng truy cập qua JavaScript.             | Dễ dàng truy cập qua JavaScript.  |
| **Bảo mật HTTPS**      | Có thể bảo vệ bằng `Secure` và `HttpOnly`.                | Không có bảo vệ HTTPS.                       | Không có bảo vệ HTTPS.            |
| **Cross-domain**       | Có thể gửi cookies qua domain khác với `SameSite: None`.  | Không hỗ trợ cross-domain.                   | Không hỗ trợ cross-domain.        |
| **Sử dụng phổ biến**   | Xác thực, lưu session, trạng thái người dùng.             | Lưu dữ liệu lâu dài trên client (key-value). | Lưu dữ liệu tạm thời trên client. |
