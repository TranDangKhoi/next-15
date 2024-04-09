import { cookies } from "next/headers";
export default async function page() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    }
  ).then(async (res) => {
    const payload = await res.json();
    const data = {
      status: res.status,
      payload,
    };
    return data;
  });
  console.log(result);
  return (
    <div>
      <h1 className="text-xl font-semibold">
        Xin chào {result.payload.data?.name}
      </h1>
    </div>
  );
}
