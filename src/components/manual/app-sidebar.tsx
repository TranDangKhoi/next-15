import { Home, LogIn, LogOut, User2, UserPlus } from "lucide-react";
import Link from "next/link";
import LogoutButton from "src/components/manual/logout-button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "src/components/ui/sidebar";
import { ThemeToggle } from "src/components/ui/theme-toggle";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Login",
    url: "/login",
    icon: LogIn,
  },
  {
    title: "Sign up",
    url: "/signup",
    icon: UserPlus,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User2,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
    isButton: true,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>NextJS 15</SidebarGroupLabel>
          <SidebarTrigger></SidebarTrigger>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.isButton ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <LogoutButton>Log out</LogoutButton>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
              <SidebarMenuItem>
                <ThemeToggle></ThemeToggle>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
