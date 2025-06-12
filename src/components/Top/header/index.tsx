import React from 'react';

import { ModeToggle } from '@/components/Top/header/mode-toggle';
import UserButton from '@/components/Top/header/user-button';
import UserMenu from '@/components/Top/header/user-menu';
import { currentUser } from '@/lib/auth';

const Header = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <header className="h-16 border-b sticky flex justify-between items-center container">
      <nav className="flex items-center gap-4">
        <UserMenu />
      </nav>
      <nav className="flex items-center gap-4">
        <ModeToggle />
        <UserButton user={user} />
      </nav>
    </header>
  );
};

export default Header;
