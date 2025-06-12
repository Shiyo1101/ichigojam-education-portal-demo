import type { Metadata } from 'next';

import { AdminAppSidebar } from '@/components/Admin/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: '講師用ポータルサイト 管理者ページ',
  description: '講師用ポータルサイトの管理者ページです。',
};

const AdminPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SidebarProvider>
        <AdminAppSidebar />
        {children}
      </SidebarProvider>
    </>
  );
};

export default AdminPageLayout;
