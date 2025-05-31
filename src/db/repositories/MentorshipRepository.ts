import BaseRepository from "./BaseRepository";

import { asc, ilike } from "drizzle-orm";

import { mentorships } from "..";

export type GetMentorshipParams = {
  q?: string;
  page?: number;
  page_size?: number;
  user_id?: number;
};

export class MentorshipRepository extends BaseRepository {
  static override model: any = mentorships;

  static async getMentorships({
    q = "",
    page = 1,
    page_size = 10,
  }: GetMentorshipParams = {}) {
    const limit = page_size || 10;
    const offset = ((page || 1) - 1) * page_size;

    const where = q && ilike(mentorships.title, `%${q}%`);

    const data = await super.findAll(where, {
      orderBy: (Mentorships: any) => [asc(Mentorships.id)],
      limit,
      offset,
    });

    return {
      count: await super.count(where),
      data,
    };
  }
}

export default MentorshipRepository;
