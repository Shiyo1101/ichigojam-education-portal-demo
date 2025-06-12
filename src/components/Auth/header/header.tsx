'use client';

import React from 'react';

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h2 className="text-2xl font-semibold">{label}</h2>
    </div>
  );
};

export default Header;
