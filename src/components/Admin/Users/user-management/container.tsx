import { fetchUsers } from '@/components/Admin/Users/fetcher';

import { UserManagementPresentation } from './presentation';

export const UserManagementContainer = async () => {
  const users = await fetchUsers();

  return <UserManagementPresentation users={users} />;
};
