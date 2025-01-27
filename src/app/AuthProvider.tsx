"use client";
import { createContext, useContext, useState } from "react";

type TAuthContext = {
  sessionToken: string;
  setSessionToken: (token: string) => void;
};

const AuthContext = createContext<TAuthContext>({
  sessionToken: "",
  setSessionToken: () => null,
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export default function AuthProvider({
  initialSessionToken = "",
  children,
}: {
  initialSessionToken?: string;
  children: React.ReactNode;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    <AuthContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
}
