import { UserEditPanel } from '@/components/Admin/Users/user-edit-panel';

const UserEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <UserEditPanel userId={id} />;
};

export default UserEditPage;
