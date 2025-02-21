import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import { AppSidebar } from "src/components/manual/app-sidebar";
import { SidebarProvider } from "src/components/ui/sidebar";
import { ThemeProvider } from "src/components/ui/theme-provider";
import { AuthProvider } from "src/contexts/auth.contexts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homepage",
  description: "Next.js v15 App Router",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value as string;
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          themes={["light", "dark", "netflix"]}
        >
          <AuthProvider initialSessionToken={sessionToken}>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar></AppSidebar>
              <main className="w-full">{children}</main>
            </SidebarProvider>
            <ToastContainer
              className="toast-custom"
              stacked
              hideProgressBar
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
