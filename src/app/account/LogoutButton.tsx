"use client";

import { BasicButton } from "@/components/buttons/BasicButton";
import { signOut } from "firebase/auth";
import { auth } from "lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  return <BasicButton label="ログアウト" onClick={handleLogout} />;
}
