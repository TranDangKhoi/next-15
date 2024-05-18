"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "src/app/AuthProvider";

export default function Profile() {
  const { sessionToken } = useAuthContext();
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        // console.log(data);
        setProfile(data.payload.data);
        return data;
      });
    };
    fetchProfile();
  }, [sessionToken]);
  return <div>{profile?.email}</div>;
}
