import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  if (!cookieStore.get("token")) {
    redirect("/login");
  }
  redirect("/dashboard");
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
