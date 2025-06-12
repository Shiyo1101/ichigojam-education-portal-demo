'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type ComponentProps } from 'react';

import NavUser from '@/components/Admin/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { UserSession } from '@/types/user';
import { AdminNavItems } from '@/utils/constants';

type AppSidebarPresentationProps = {
  user: UserSession;
  pathname: string;
  props?: ComponentProps<typeof Sidebar>;
};

export const AppSidebarPresentation = ({ user, pathname, props }: AppSidebarPresentationProps) => {
  return (
    <Sidebar
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link href="/admin/users">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image
                    src="/images/logo.svg"
                    width={32}
                    height={32}
                    alt="Logo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">管理画面</span>
                  <span className="truncate text-xs">Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {AdminNavItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.path}
              >
                <Link href={item.path}>
                  <item.icon />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
