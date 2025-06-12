'use client';

import React from 'react';

import BackButton from '@/components/Auth/button/back-button';
import Header from '@/components/Auth/header/header';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  hederLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

const CardWrapper = ({
  children,
  hederLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={hederLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
