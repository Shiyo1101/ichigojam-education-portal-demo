import { UserEditForm } from '@/components/Admin/Users/user-edit-form';
import { ModeToggle } from '@/components/Top/header/mode-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import type { UserSession } from '@/types/user';

export const UserEditPanelPresentation = ({ user }: { user: UserSession }) => {
  return (
    <SidebarInset className="h-full">
      <header className="px-4 flex h-16 shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="h-8 w-8" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin/users">ユーザー管理</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>編集</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ModeToggle />
      </header>
      <UserEditForm user={user} />
    </SidebarInset>
  );
};
