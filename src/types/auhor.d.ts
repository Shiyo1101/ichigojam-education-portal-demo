import type { UserRole } from '@prisma/client';

export type Author = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string;
  role: UserRole;
};
