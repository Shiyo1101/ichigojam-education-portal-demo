import 'server-only';

import { cache } from 'react';

import { db } from '@/lib/db';

export const fetchUsers = cache(async () => {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });
});

export const fetchUserById = cache(async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });
});
