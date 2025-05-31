"use server";
import crypto from "crypto";

import { getSession } from "./auth";
import UserRepository from "@/db/repositories/UserRepository";

export async function getMe() {
  const session: any = await getSession();

  if (!session) {
    return null;
  }

  const user = await UserRepository.findById(session.payload.sub);

  return user;
}

export async function getUsers(params: any = {}) {
  const data = await UserRepository.getUsers(params);

  return {
    data,
  };
}

export async function createUser(data: any) {
  data.password = crypto.createHash("sha1").update(data.password).digest("hex");
  return await UserRepository.create(data);
}

export async function updateUser(id: number, data: any) {
  if (data.password) {
    data.password = crypto
      .createHash("sha1")
      .update(data.password)
      .digest("hex");
  } else {
    delete data.password;
  }

  return await UserRepository.update(id, data);
}

export async function removeUser(id: string) {
  return await UserRepository.deleteById(id);
}
