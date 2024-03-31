import Link from "next/link";
import ModeToggle from "src/components/toggle-theme";

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
      <ModeToggle></ModeToggle>
    </nav>
  );
}
