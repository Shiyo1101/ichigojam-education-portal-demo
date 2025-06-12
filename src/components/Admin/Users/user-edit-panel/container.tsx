import { notFound } from 'next/navigation';

import { fetchUserById } from '@/components/Admin/Users/fetcher';

import { UserEditPanelPresentation } from './presentation';

export const UserEditPanelContainer = async ({ userId }: { userId: string }) => {
  const user = await fetchUserById(userId);
  if (!user) {
    notFound();
  }

  return <UserEditPanelPresentation user={user} />;
};
