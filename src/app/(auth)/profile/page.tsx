import { cookies } from "next/headers";
import React from "react";
import authApiRequest from "src/api/auth/requests";
import ProfileWelcome from "src/app/(auth)/profile/profile-welcome";
import UpdateProfileForm from "src/app/(auth)/profile/update-profile-form";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value as string;
  const result = await authApiRequest.nextGetProfile(sessionToken);
  return (
    <div className="w-[600px] mx-auto mt-10">
      <ProfileWelcome name={result.payload.data.name}></ProfileWelcome>
      <UpdateProfileForm></UpdateProfileForm>
    </div>
  );
}
