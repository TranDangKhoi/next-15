"use client";
import { createContext, useState } from "react";
import { IUser } from "src/interfaces/user.interfaces";
import { clientSessionToken } from "src/lib/http";

interface IAuthContext {
  userProfile: IUser | null;
  setUserProfile: (userProfile: IUser) => void;
}

const AuthContext = createContext<IAuthContext>({
  userProfile: {
    id: 0,
    name: "",
    email: "",
  },
  setUserProfile: (userProfile: IUser) => {},
});

const AuthProvider = ({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken: string;
}) => {
  if (typeof window !== "undefined") {
    clientSessionToken.value = initialSessionToken;
  }
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  return (
    <AuthContext.Provider
      value={{
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
