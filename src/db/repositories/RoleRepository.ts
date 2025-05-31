import BaseRepository from './BaseRepository';

import { asc, ilike } from 'drizzle-orm';
import { roles } from '..';

export type GetRoleParams = {
  q?: string;
  page?: number;
  page_size?: number;
};

export class RoleRepository extends BaseRepository {
  static override model: any = roles;

  static async getRoles({ q = '', page = 1, page_size = 10 }: GetRoleParams = {}) {
    const limit = page_size || 10;
    const offset = ((page || 1) - 1) * page_size;

    const where = q && ilike(roles.name, `%${q}%`);

    const data = await super.findAll(where, {
      orderBy: (roles: any) => [asc(roles.id)],
      limit,
      offset,
    });

    return {
      count: await super.count(where),
      data,
    };
  }
}

export default RoleRepository;
