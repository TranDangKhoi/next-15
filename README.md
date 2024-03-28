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

## Khác biệt giữa Client Component và Server Component trong Next.js

### React SPA truyền thống (React Vite, CRA, ...) là 1 client component khổng lồ

Khi lần đầu vào 1 trang web

1. Trình duyệt **request** đến server và trả về file `index.html` cơ bản (hầu như không chứa html gì nhiều)
2. Trình duyệt nhận thấy trong file html có link đến file js, css nên là **request lần nữa** đến server để lấy file js, css
3. Trình duyệt tiến hành chạy code JS để render ra HTML và gắn sự kiện vào HTML đó
4. Người dùng thấy và tương tác được với trang web

Trong quá trình này, web sẽ trắng xóa cho đến khi bước thứ 3 được hoàn thành.

Vậy nên mới nói lần đầu tiên khi truy cập vào các SPA truyền thống khá lâu, nhưng sau đó thì thao tác hay chuyển trang sẽ rất nhanh vì js bundle cả app đã có ở client rồi, nếu cần data thì mới request đến server lấy data thôi.

Các bạn để ý cái bước thứ 3, lúc nào HTML cũng được JavaScript trình duyệt render ra khi chúng ta truy cập vào web. Cái này gọi là **Dynamic Rendering**

Với Dynamic Rendering, HTML được render ra khi chúng ta request, có thể được render ở client hoặc server đều được.

### Client Component Next.js

Dùng client component khi:

- Cần tương tác: dùng hook, useState, useEffect, event listener (onClick, onSubmit, onChange,...), ...
- Cần dùng các API từ trình duyệt

Trong Next.js, mặc định tất cả các component đều được render ra HTML sẵn khi có thể lúc Nextjs build (Static Rendering). Kể cả Server component và Client component.

Vậy nên khi bạn truy cập vào 1 trang web Next.js, bạn sẽ thấy UI ngay lập tức do Server Next.js trả về HTML đã render sẵn. Sau đó trình duyệt sẽ render lại CLient Component 1 lần nữa để đồng bộ DOM, sự kiện, state, effect.

Rút ra được điều gì từ đây?

- Client Component bị render tối thiểu 2 lần: 1 lần khi build, 1+ lần ở client
- Vì trả về HTML sẵn nên người dùng có thể thấy content ngay lập tức (Tăng UX)
- Dù thấy content ngay lập tức nhưng vẫn không thể tương tác ngay được vì cần phải chờ trình duyệt đồng bộ lại client component (render, gắn sự kiện, state, effect...)

Ưu điểm của Client Component:

- Giảm gánh nặng cho server khi component nặng và phức tạp về logic => Server yếu thì nên dùng

Nhược điểm của Client Component:

- SEO không tốt
- Thiết bị client yếu thì chạy không nổi
- Tăng bundle size javascript

Lời khuyên cá nhân:

Dùng Server Component khi có thể,không đặt nặng vấn đề về cấu hình Server, vì dùng cho production thì server phải tốt. Quan trọng là trải nghiệm người dùng

### Server Component Next.js

Đây là chế độ mặc định khi bạn tạo một component trong Next.js

Ưu điểm:

- Fetch data ở server => Nơi gần data center nên là sẽ nhanh hơn là fetch ở client => Giảm thiểu thời gian rendering, tăng UX
- Bảo mật: Server cho phép giữ các data nhạy cảm, logic đặc biệt không muốn public ở client
- Caching: Vì được render ở server nên có thể lưu giữ cache cho nhiều người dùng khác nhau => Không cần render trên mỗi request
- Bundle Size: Giảm thiểu JS bundle size vì client không cần tải về phần JS logic để render HTML
- Load trang lần đầu nhanh và chỉ số FCP (First Contentful Paint) thấp do người dùng sẽ thấy content ngay lập tức
- Search Engine Optimization and Social Network Shareability
- Streaming

=> Ưu tiên dùng Server Component khi có thể
