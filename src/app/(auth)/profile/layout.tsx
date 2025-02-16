import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Your profile",
  description: "Overview of yourself",
};

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
