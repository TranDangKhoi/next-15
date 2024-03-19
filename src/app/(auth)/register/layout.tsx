import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regiter page",
  description: "Register page in NextJS app",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
