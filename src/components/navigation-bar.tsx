import Link from "next/link";
import ButtonLogout from "src/components/button-logout";
import ThemeToggle from "src/components/theme-toggle";
import { clientSessionToken } from "src/lib/http";

export default function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/register">Đăng ký</Link>
        </li>
        <li>
          <Link href="/login">Đăng nhập</Link>
        </li>
        <li>
          <ButtonLogout></ButtonLogout>
        </li>
      </ul>
      <ThemeToggle></ThemeToggle>
    </nav>
  );
}
