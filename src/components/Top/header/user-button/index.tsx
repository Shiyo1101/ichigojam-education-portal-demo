import { LogOutIcon, MonitorCogIcon, SettingsIcon, UserRound } from 'lucide-react';
import Link from 'next/link';

import { LogoutButton } from '@/components/Top/header/user-button/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UserSession } from '@/types/user';

const UserButton = ({ user }: { user: UserSession }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-sky-500">
            <UserRound className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-50"
        align="end"
      >
        <DropdownMenuLabel>
          {user.name}
          <p className="text-xs text-slate-500">{user.email}</p>
          <p className="text-xs text-slate-500">{user.role}</p>
        </DropdownMenuLabel>
        {user.role === 'ADMIN' && (
          <>
            <DropdownMenuSeparator />
            <Link href="/admin/users">
              <DropdownMenuItem>
                <MonitorCogIcon className="h-4 w-4 mr-2" />
                Management
              </DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuSeparator />
        <Link href="/settings">
          <DropdownMenuItem>
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
