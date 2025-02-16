import React from "react";
import LoginForm from "src/app/(auth)/login/login-form";

export default function LoginPage() {
  return (
    <div className="w-[600px] mx-auto mt-10">
      <div className="flex flex-col items-center justify-center gap-4 mx-auto">
        <h1 className="text-4xl font-bold">Login</h1>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
