import { auth } from '@/auth';

export const currentUser = async () => {
  const session = await auth();

  if (!session) {
    throw new Error('No session found');
  }

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  if (!session) {
    throw new Error('No session found');
  }

  return session?.user?.role;
};
