import type { UserRole } from '@prisma/client';
import type { User } from 'next-auth';

export type UserSession = User & {
  role: UserRole;
};
