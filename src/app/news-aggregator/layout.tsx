import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "../../../lib/firebaseAdmin";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("__session");

  if (!session) {
    redirect("/auth/login");
  }

  try {
    await adminAuth.verifySessionCookie(session.value, true);
  } catch (error) {
    console.error("セッション検証失敗:", error);
    redirect("/auth/login");
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-start gap-4 w-10/12 pt-8 max-w-7xl">
        <h1 className="text-3xl font-bold">ニュースアグリゲーター</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
