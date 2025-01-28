"use client";

type TProfileProps = {
  email: string;
};

export default function Profile({ email }: TProfileProps) {
  return <div>{email}</div>;
}
