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

## Next.js render component của bạn như thế nào?

Component ở đây bao gồm Server Component và Client Component

### Khi chúng ta build

Mọi component dù là Server Component hay Client Component khi build đều sẽ có

- Static HTML
- JS Bundle
- Ngoài ra còn có CSS Bundle, Image, Font,...

### Khi request lần đầu tiên (full page load)

1. Server Next.Js render server component và kết hợp với Client Component để tạo ra HTML để gửi về client

2. Client ngay lập tức thấy được website nhưng chưa tương tác được với nó (ví dụ chưa click, hover,...)

3. Trong đống JS Bundle download về có chứa **React Server Component Payload (RSC Payload)**, cái này dùng để để render lại client component ở client, cập nhật DOM

<a id="ditto"></a> 4. Cuối cùng là sẽ thêm các sự kiện vào các client component để tương tác với người dùng => Bước này gọi là Hydration, sau bước này thì có thể tương tác với website

> React Server Component Payload là 1 data đặc biệt được render ở phía Server phục vụ cho việc đồng bộ, cập nhật DOM giữa Client Component và Server Component

### Khi request lần thứ 2 (Subsequent Navigations)

LƯU Ý: LẦN THỨ 2 Ở ĐÂY KHÔNG PHẢI LÀ CHÚNG TA TẮT TRÌNH DUYỆT ĐI MỞ LẠI, HOẶC F5 LẠI TRANG WEB. REQUEST LẦN THỨ 2 Ở ĐÂY ĐƯỢC HIỂU THEO NGHĨA LÀ CHÚNG TA THỰC HIỆN CÁC THAO TÁC NAVIGATE QUA LẠI CÁC SECTION BÊN TRONG TRANG WEB HIỆN TẠI,

Ví dụ chúng ta navigate từ `/home` sang `/about`

Thì server Next.js sẽ không trả HTML về cho chúng ta nữa mà trả React Server Component Payload (RSC Payload) và các bundle JS, CSS cần thiết.

Lúc này, client sẽ tự render ra HTML (Điều này không đồng nghĩa với việc Server không render ra HTML nữa, mà là do Server đã render ra RSC Payload rồi và trong cái RSC Payload đó đã có sẵn HTML).

> Nguyên nhân: [Như trên đã viết](#ditto), React Server Component Payload là 1 data đặc biệt được render ở phía Server phục vụ cho việc đồng bộ, cập nhật DOM giữa Client Component và Server Component. Và vì nó đã render ở phía Server thế nên các lần navigate sau sẽ không cần phải trả ra file HTML nữa, mà dựa vào cái payload đó mà render ra thôi

Điều này sẽ giúp việc navigation nhanh hơn, nhưng vẫn đảm bảo về SEO

## Quản lý Auth trong Next.js

Để xác thực một request thì backend thường sẽ xác thực qua 2 cách:

1. FE gửi token qua header của request như `Authorization: Bearer <token>` (token thường được lưu trong localStorage của trình duyệt)
2. FE gửi token qua cookie của request (sự thật là cookie cũng nằm trong header của request)

Cách dùng Cookie có ưu điểm là an toàn hơn 1 chút so với cách dùng localStorage, nhưng đòi hỏi setup giữa Backend và FrontEnd phức tạp hơn.

Next.js chúng ta có thể dùng 2 cách trên, nhưng nó phức tạp hơn so với React.Js Client Side Rendering (CSR) truyền thống vì Next.js có cả Server và Client

### Cách 1: Dùng localStorage

Cách này chỉ áp dụng cho server check authentication dựa vào header `Authorization` của request.

- Tại trang login, chúng ta gọi api `/api/login` để đăng nhập. Nếu đăng nhập thành công, server sẽ trả về token, chúng ta lưu token vào localStorage. Việc này chúng ta sẽ làm ở phía client hoàn toàn.

- Tại những trang không cần authenticated, chúng ta có thể gọi api ở cả server và client của next.js mà không cần phải làm gì thêm.

Vấn đề sẽ nằm ở những trang cần authenticated. Làm sao để Next.js biết được user đã authenticated hay chưa? Để giải quyết vấn đề này chúng ta cần thiết kế một middleware

### Middleware ở Next.js

Middleware ở Next.js thì có 2 loại:

1. Middleware hoạt động ở client next (giống như những gì chúng ta đã làm trước đây ở React.js truyền thống)
2. Middleware hoạt động ở server next

#### Middleware ở client next

Nếu dùng middleware client thì chỉ cần tạo 1 `use client` `AuthenticatedComponent` và wrap nó ở những trang cần authenticated.

```tsx
"use client";
export default function AuthenticatedComponent({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <div>Chưa đăng nhập</div>;
  return children;
}
```

Cách dùng middleware này là server next.js sẽ không biết được user đã authenticated hay chưa. Ví dụ bạn truy cập vào trang `/profile` (cần authenticated) thì đây là flow diễn ra

Bạn enter url `/profile`
=> Trình duyệt gửi request đến server Next.js (request này sẽ gửi kèm cookie nếu có)
=> Server Next.js sẽ render trang `/profile` vì không biết được user đã authenticated hay chưa và trả về trình duyệt
=> Trình duyệt nhận được trang `/profile` và chạy `use client` `AuthenticatedComponent`
=> `AuthenticatedComponent` sẽ kiểm tra xem có token trong localStorage không, nếu có thì render trang `/profile` ra, nếu không thì render ra `Chưa đăng nhập`

Kết quả vẫn đúng, người dùng vẫn thấy trang `/profile` nếu đã authenticated nhưng cách này có một số khuyết điểm

- Profile Component phải là một client nếu chúng ta cần fetch các api cần authenticated, vì chỉ có client mới có thể truy cập được vào localStorage

- Không đồng nhất giữa server và client, điều này không tốt.

Cách giải quyết là dùng middleware ở server next.js

#### Middleware ở server next

Next.js cung cấp 1 cách để chúng ta có thể dùng middleware ở server next.js, có thể xem [tại đây](https://nextjs.org/docs/app/building-your-application/routing/middleware)

Middleware này sẽ chạy ngay khi có request gửi đến server Next.js, trước khi trang được render ở server.

Nhưng chúng ta cần 1 thứ gì đó để Next.js biết được user đã authenticated hay chưa, và thứ đó là chỉ có thể là cookie từ trình duyệt gửi lên. Vì khi bạn enter url `/profile` thì chỉ có cookie là được gửi kèm theo request đến server Next.js.

Nãy giờ chưa setup cookie gì cả, bây giờ chúng ta sẽ setup logic cookie. Đó là khi chúng ta login thành công thì chúng ta sẽ set cookie là `isLogged=true` vào trình duyệt ở client luôn. Cookie này có thời hạn tương tự với token, và cookie `isLogged` có thể dùng JavaScript can thiệp được. Như vậy thì khi request đến server Next.js thì server sẽ biết được user đã authenticated hay chưa dựa vào cookie `isLogged`. Client next.js cũng sẽ biết được user đã authenticated hay chưa dựa vào cookie `isLogged` (hoặc giá trị lưu trong localStorage tùy thích, nhưng khuyến khích dùng `isLogged` từ cookie cho đồng bộ).

Và đây là middleware ở server next.js

```tsx
export const config = {
  matcher: ["/profile"],
};
export function middleware(request: NextRequest) {
  const isLogged =
    (request.cookies.get("isLogged")?.value as string | undefined) === "true";
  if (!isLogged) return new Response("Chưa đăng nhập", { status: 401 });
}
```

Ưu điểm cách này là đồng bộ được giữa server và client.

#### Gọi api trong next.js

Xong phần middleware cho localStorage, giờ chúng ta sẽ tìm hiểu cách gọi api trong next.js

Gọi API thì cũng có 2 cách là gọi ở client và gọi ở server. Ở đây mình chỉ bàn về việc gọi các API cần authenticated, vì những API không cần authenticated thì gọi ở cả client và server đều được.

Nếu gọi API cần authenticated như GET `/api/profile` thì chúng ta chỉ cần gán token vào header `Authorization` là xong. Y hệt như gọi API ở React.js truyền thống.

Còn gọi API cần authenticated ở server next.js thì làm thế nào để gán được token vào header `Authorization`, vì ở server Next.js, bạn không thể truy cập vào được localStorage của trình duyệt.

Thực sự đây chính là khuyết điểm của việc dùng localStorage để Authentication với Next.js.

Dù sao thì các route cần authenticated cũng không cần SEO nên không cần gọi ở server để SEO làm gì cả. Bạn hoàn toàn có thể gọi api ở client, nếu bạn chấp nhận điều này thì không sao cả.

Nhưng với cá nhân mình là người cầu toàn thì không thích khuyết điểm này lắm, chưa kể là Next.js với tôn chỉ là ưu tiên mọi thứ ở server.

Để giải quyết điều này thì chúng ta không nên dùng LocalSoage mà nên dùng Cookie để lưu token nhé. Đi đến cách 2 nào.

### Cách 2: Dùng Cookie

Cách này áp dụng cho Server check token dựa vào cookie hay header `Authorization` đều được.

Tại trang login chúng ta gọi api là `/app/login` từ Server Action để đăng nhập. Chúng ta dùng Server Action để làm proxy, trong server action, khi login thành công, chúng ta sẽ set cookie `token` vào trình duyệt và trả về token cho client để client set vào Context API hoặc caching react tùy thích (phục vụ nếu cần gọi api ở client).
