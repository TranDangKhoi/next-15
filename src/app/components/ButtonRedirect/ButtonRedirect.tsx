"use client";
import { useRouter } from "next/navigation";
import React from "react";

type TButtonRedirectProps = {
  something: string;
};

const ButtonRedirect = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };
  return <button onClick={handleNavigate}>Go to login page</button>;
};

export default ButtonRedirect;
