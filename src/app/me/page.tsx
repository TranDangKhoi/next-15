import { cookies } from "next/headers";
import authApiRequest from "src/app/api/auth/requests";
export default async function page() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await authApiRequest.getProfile(sessionToken?.value as string);
  return (
    <div>
      <h1 className="text-xl font-semibold">
        Xin chào {result.payload.data.email}
      </h1>
      {/* <Profile email={result.email}></Profile> */}
    </div>
  );
}
