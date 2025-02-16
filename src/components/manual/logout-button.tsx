"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import authApiRequest from "src/app/api/auth/requests";
import { Button } from "src/components/ui/button";
import { handleApiErrorResponse } from "src/lib/utils";

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.nextLogout().then((res) => {
        router.push("/login");
      });
    } catch (err) {
      handleApiErrorResponse({
        error: err,
      });
    }
  };
  return (
    <Button className="w-full" onClick={handleLogout}>
      <LogOut />
      {children}
    </Button>
  );
}
