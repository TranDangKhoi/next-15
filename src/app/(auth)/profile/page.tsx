import { cookies } from "next/headers";
import React from "react";
import ProfileWelcome from "src/app/(auth)/profile/profile-welcome";
import authApiRequest from "src/app/api/auth/requests";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  // const result = await authApiRequest.getProfile(sessionToken?.value as string);
  return (
    <h1 className="text-4xl font-bold">
      <ProfileWelcome></ProfileWelcome>
    </h1>
  );
}
