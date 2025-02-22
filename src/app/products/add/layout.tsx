import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Products Page",
  description: "Add Products Page",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
