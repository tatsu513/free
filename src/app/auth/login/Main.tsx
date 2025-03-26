"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setSession } from "@/app/auth/login/action";
import { useRouter } from "next/navigation";
import { auth } from "lib/firebase";

const Main = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await setSession(idToken);

      if (res.success) {
        router.push("/news-aggregator");
      } else {
        alert("セッション作成に失敗しました");
      }
    } catch (err) {
      console.error("ログイン処理中にエラーが発生", err);
    }
  };
  return <PrimaryButton label="google" onClick={handleLogin} />;
};

export default Main;
