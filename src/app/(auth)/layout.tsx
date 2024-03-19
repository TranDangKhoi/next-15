export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>Authentication related pages</h1>
      {children}
    </div>
  );
}
