import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { currentUser } from '@/lib/auth';

import { AppSidebarPresentation } from './presentation';

export const AppSidebarContainer = async () => {
  const user = await currentUser();
  const header = await headers();
  const pathname = header.get('x-pathname');

  if (user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  if (!pathname) {
    notFound();
  }

  return (
    <AppSidebarPresentation
      user={user}
      pathname={pathname}
    />
  );
};
