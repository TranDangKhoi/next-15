import { cookies } from "next/headers";
import React from "react";
import authApiRequest from "src/app/api/auth/requests";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await authApiRequest.getProfile(sessionToken?.value as string);
  return (
    <h1 className="text-4xl font-bold">Xin chào, {result.payload.data.name}</h1>
  );
}
