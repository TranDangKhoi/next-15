"use client";

import { useEffect } from "react";
import authApiRequest from "src/app/api/auth/requests";

export default function ProfileWelcome() {
  useEffect(() => {
    const profileResponse = authApiRequest.getProfile();
  }, []);
  return <div></div>;
}
