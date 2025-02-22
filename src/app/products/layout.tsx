import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
