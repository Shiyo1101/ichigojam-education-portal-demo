import { cache } from 'react';

import { db } from '@/lib/db';

export const fetchMemos = cache(async () => {
  return await db.memo.findMany({
    where: {
      checked: false,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
});
