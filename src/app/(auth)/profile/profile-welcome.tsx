"use client";

import { useEffect } from "react";
import authApiRequest from "src/app/api/auth/requests";

export default function ProfileWelcome({ name }: { name: string }) {
  useEffect(() => {
    const profileResponse = authApiRequest.getProfile();
  }, []);
  return <h1 className="text-4xl font-bold">Welcome to my website, {name}</h1>;
}
