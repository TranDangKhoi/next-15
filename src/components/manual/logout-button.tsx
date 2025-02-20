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
  const abortController = new AbortController();
  const handleLogout = async () => {
    try {
      await authApiRequest.nextLogout(true, abortController.signal).then(() => {
        router.push("/login");
      });
    } catch (err) {
      handleApiErrorResponse({
        error: err,
      });
    }
  };
  return (
    <Button className="w-full flex items-center justify-center" onClick={handleLogout}>
      <LogOut className="shrink-0"/>
      <span className="truncate group-data-[state=collapsed]:hidden">{children}</span>
    </Button>
  );
}
