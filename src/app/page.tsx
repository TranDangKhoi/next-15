import Image from "next/image";
import { redirect } from "next/navigation";

const isLoggedIn = false;

export default function Home() {
  if (!isLoggedIn) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-3">
        {/* <Link href={"/login"}>Login Page</Link>
        <Link href={"/register"}>Register Page</Link> */}
        {/* <button type="button" onClick={() => router.push("/login")}>
          Login Page
        </button>
        <button type="button" onClick={() => router.push("/register")}>
          Register Page
        </button> */}
        {/* <ButtonRedirect></ButtonRedirect> */}
      </div>
      <Image
        src="https://plus.unsplash.com/premium_photo-1681412205470-77848a519359?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Whatever"
        width={500}
        height={500}
      ></Image>
    </main>
  );
}
