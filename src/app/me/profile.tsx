"use client";

import { useAuthContext } from "src/app/AuthProvider";

export default function Profile() {
  const { sessionToken, setSessionToken } = useAuthContext();
  return <div>profile</div>;
}
