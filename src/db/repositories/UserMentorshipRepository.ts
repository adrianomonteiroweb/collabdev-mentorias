import BaseRepository from "./BaseRepository";

import { asc, eq } from "drizzle-orm";

import { user_mentorships } from "..";

export type GetUserMentorshipParams = {
  q?: string;
  page?: number;
  page_size?: number;
  user_id?: number;
};

export class UserMentorshipRepository extends BaseRepository {
  static override model: any = user_mentorships;

  static async getUserMentorships({ user_id }: GetUserMentorshipParams = {}) {
    const where: any = eq(user_mentorships.user_id, user_id);

    const data = await super.findAll(where, {
      orderBy: (user_mentorships: any) => [asc(user_mentorships.id)],
      with: {
        mentorship: true,
        user: true,
      },
    });

    return {
      count: data.length,
      data,
    };
  }
}

export default UserMentorshipRepository;
