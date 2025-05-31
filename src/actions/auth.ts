"use server";

import UserRepository from "@/db/repositories/UserRepository";
import JWTAuth from "@/utils/jwt";
import crypto from "crypto";

import { cookies } from "next/headers";

const COOKIE_KEY = "collabdev";

export async function createSession(email: string, password: string) {
  const user = await UserRepository.findByEmail(email);

  if (!user) {
    return {
      status: 401,
      error: {
        message: "Unauthorized",
      },
    };
  }

  const user_password = user?.password || "";

  const double_hashed_password = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex");

  const valid = double_hashed_password === user_password;

  if (valid) {
    const { access_token } = JWTAuth.create(user);

    const cookieStore = await cookies();

    cookieStore.set({
      name: COOKIE_KEY,
      value: Buffer.from(access_token).toString("base64"),
      httpOnly: true,
      path: "/",
    });

    return { status: 200 };
  } else {
    return {
      status: 401,
      error: {
        message: "Unauthorized",
      },
    };
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEY);
}

export async function getSession() {
  const cookieStore = await cookies();
  const data = cookieStore.get(COOKIE_KEY);

  if (data) {
    const access_token = Buffer.from(data.value, "base64").toString();
    return { payload: JWTAuth.decode(access_token) };
  }

  return null;
}
