"use server";

import { cookies } from "next/headers";
import { adminAuth } from "../../../../lib/firebaseAdmin";

export const setSession = async (token: string) => {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });

    const cookieStore = await cookies();

    cookieStore.set("__session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return { success: true };
  } catch (err) {
    console.error("セッション作成失敗", err);
    return { success: false, message: "セッション作成に失敗しました" };
  }
};
