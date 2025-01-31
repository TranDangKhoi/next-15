import { cookies } from "next/headers";
import authApiRequest from "src/app/api/auth/requests";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  try {
    const result = await authApiRequest.logout({
      sessionToken,
    });
  } catch (err) {
    return err;
  }
}
