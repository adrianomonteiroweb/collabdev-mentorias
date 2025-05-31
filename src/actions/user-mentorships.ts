"use server";

import UserMentorshipRepository from "@/db/repositories/UserMentorshipRepository";
import { getMe } from "./users";

export async function getUserMentorshipById(id: number) {
  return await UserMentorshipRepository.findById(id);
}

export async function getUserMentorships() {
  const me = await getMe();

  const data = await UserMentorshipRepository.getUserMentorships({
    user_id: me?.id,
  });

  return {
    data,
  };
}

export async function createUserMentorship(data: any) {
  return await UserMentorshipRepository.create(data);
}

export async function updateUserMentorship(id: number, data: any) {
  return await UserMentorshipRepository.update(id, data);
}

export async function removeUserMentorship(id: string) {
  return await UserMentorshipRepository.deleteById(id);
}
