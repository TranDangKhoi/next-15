import { decodeJwt } from "src/lib/utils";

export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.sessionToken;

  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      },
    );
  }
  const decodedSessionToken = decodeJwt(sessionToken);
  const expiresDate = new Date((decodedSessionToken.exp as number) * 1000).toUTCString();
  return new Response(JSON.stringify({ sessionToken }), {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax Secure`,
    },
  });
}
