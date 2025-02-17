import { cookies } from "next/headers";
import React from "react";
import ProfileWelcome from "src/app/(auth)/profile/profile-welcome";
import authApiRequest from "src/app/api/auth/requests";

export default async function ProfilePage() {
  // const cookieStore = await cookies();
  // const sessionToken = cookieStore.get("sessionToken")?.value as string;
  // const result = await authApiRequest.nextGetProfile(sessionToken);
  return (
    <h1 className="text-4xl font-bold">
      {/* Hi, {result.payload.data.name} */}
      <ProfileWelcome></ProfileWelcome>
    </h1>
  );
}
