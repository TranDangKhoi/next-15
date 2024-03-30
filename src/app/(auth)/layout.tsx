import ModeToggle from "src/components/toggle-theme";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Authentication related pages</h1>
      <ModeToggle></ModeToggle>
      {children}
    </div>
  );
}
