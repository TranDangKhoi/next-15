"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authApiRequest from "src/app/api/auth/requests";
import { clientSessionToken } from "src/lib/http";

export default function LogoutPage() {
  const abortController = new AbortController();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");
  useEffect(() => {
    (async () => {
      if (sessionToken && sessionToken === clientSessionToken.value) {
        await authApiRequest.nextLogout(true, abortController.signal).then(() => {
          router.replace("/login");
        });
      }
    })();
  }, [abortController.signal, router, sessionToken]);
  return <div></div>;
}
