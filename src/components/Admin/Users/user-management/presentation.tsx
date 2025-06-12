import { UserListTable } from '@/components/Admin/Users/user-list-table';
import { ModeToggle } from '@/components/Top/header/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import type { UserSession } from '@/types/user';

type UserManagementPresentationProps = {
  users: UserSession[];
};

export const UserManagementPresentation = ({ users }: UserManagementPresentationProps) => {
  return (
    <SidebarInset className="h-full">
      <header className="px-4 flex h-16 shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-8 w-8" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          ユーザー管理
        </div>
        <ModeToggle />
      </header>
      <main className="flex flex-1 p-4">
        <UserListTable users={users} />
      </main>
    </SidebarInset>
  );
};
