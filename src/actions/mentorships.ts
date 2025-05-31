"use server";

import MentorshipRepository from "@/db/repositories/MentorshipRepository";

export async function getMentorships(params: any = {}) {
  const data = await MentorshipRepository.getMentorships(params);

  return {
    data,
  };
}

export async function getMentorshipById(id: number) {
  return await MentorshipRepository.findById(id);
}

export async function createMentorship(data: any) {
  return await MentorshipRepository.create(data);
}

export async function updateMentorship(id: number, data: any) {
  return await MentorshipRepository.update(id, data);
}

export async function removeMentorship(id: string) {
  return await MentorshipRepository.deleteById(id);
}
