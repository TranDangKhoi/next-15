## ShadcnUI

Đây là một thư viện khá hay, thoạt đầu nhìn vào thì tưởng rằng nó sẽ là các cái styled component:

- Được styled sẵn với khả năng custom CSS cực kì hạn chế
- Các tính năng có sẵn được tích hợp bên trong (giống như Ant Design hoặc MUI)
- Cực kì khó làm việc khi sử dụng Typescript.

Nhưng mà tìm hiểu xong mới thấy là ngược lại :D , cực kì dễ custom, dễ hiểu và dễ dùng. Ngoài ra nó còn tích hợp giúp ta những thư viện khá hay như tailwind-merge, clsx

Nhưng mà cái gì cũng có qua có lại, với những dự án không quá phức tạp về "cái đẹp" và không cần design thì ta có thể đẩy nhanh tiến độ công việc bằng AntD và MUI

=> Như vậy sẽ không tốn hàng giờ để CSS và lo nghĩ về chức năng của component đó có chuẩn chưa, có bugs hay không?

> Một số công ty cũng sẽ yêu cầu designers của họ design theo các components có sẵn trên trang web của AntD hoặc MUI luôn để tiết kiệm thời gian cho devs

### Cách dùng ShadcnUI

Trước hết, hãy làm theo phần Installation của ShadcnUI trước sau đó:

Ví dụ, ta muốn tích hợp cho website của chúng ta một chiếc Acccordion với đầy đủ tính năng đóng/mở, animation mượt mà, khả năng custom cao. Thì ta chỉ vào ShadcnUI và bấm vào mục
[Accordion](https://ui.shadcn.com/docs/components/accordion) của ShadcN

## App Router

Ở các phiên bản NextJS dạo gần đây, thay vì sử dụng phương thức Routing bằng **Page Router** như cũ thì bây giờ ta sẽ sử dụng **App Router**. Về căn bản thì cũng không có nhiều sự khác biệt lắm, để giúp ta dễ làm quen hơn khi chuyển sang cách tiếp cận mới.

Nhưng đọc qua thì ta cũng sẽ thấy vài điểm khác biệt:

- Routing bây giờ sẽ là server-centric thay vì là client-sided, điều này cũng đồng nghĩa với việc routing bây giờ sẽ hỗ trợ server components

- Layouts có thể nested & dynamic thay vì static như trước

Việc chọn App Router hay Page Router cho project của mình phần lớn là dựa vào nghiệp vụ của project đó:

- Nếu bạn muốn mọi thứ đơn giản nhất có thể thì có thể sử dụng luôn Page Router

- Còn nếu project phức tạp hơn, đòi hỏi flexiblility thì ta nên sử dụng App Router
