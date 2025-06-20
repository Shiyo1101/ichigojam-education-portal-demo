import SettingFrom from '@/components/Settings/setting-form';
import { currentUser } from '@/lib/auth';

export const runtime = 'edge';

const SettingsPage = async () => {
  const user = await currentUser();

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <SettingFrom user={user} />
    </main>
  );
};

export default SettingsPage;
