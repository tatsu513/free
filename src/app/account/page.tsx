import { adminAuth } from "lib/firebaseAdmin";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function Home() {
  const session = (await cookies()).get("__session")?.value;

  if (!session) {
    redirect("/auth/login");
  }
  try {
    const decodedToken = await adminAuth.verifySessionCookie(session, true);
    return (
      <div className="container mt-10">
        <div className="flex flex-col items-center gap-4">
          <h1>アカウント</h1>
          <p>ユーザーID: {decodedToken.uid}</p>
          <p>メールアドレス: {decodedToken.email}</p>
          <LogoutButton />
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
