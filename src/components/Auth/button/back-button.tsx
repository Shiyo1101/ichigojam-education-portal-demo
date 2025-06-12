'use client';

import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: ClassValue;
  href: string;
  label: string;
}

const BackButton = ({ className, href, label }: BackButtonProps) => {
  return (
    <Button
      variant="link"
      className={clsx(className, 'font-normal w-full')}
      size="sm"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
