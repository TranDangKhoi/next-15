import Link from "next/link";
import ThemeToggle from "src/components/toggle-theme";

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
      </ul>
      <ThemeToggle></ThemeToggle>
    </nav>
  );
}
