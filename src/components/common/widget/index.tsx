import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WidgetProps {
  children: React.ReactNode;
  title: string;
  description?: string | undefined;
  externalLink?: string;
}

export function Widget({ children, title, description, externalLink }: WidgetProps) {
  return (
    <Card className="w-auto min-w-80">
      <CardHeader>
        <CardTitle className="text-center text-xl lg:text-2xl">
          {externalLink ? (
            <Link
              className="flex items-center justify-center gap-2"
              href={externalLink}
              target="_blank"
            >
              <ExternalLink />
              {title}
            </Link>
          ) : (
            <>{title}</>
          )}
        </CardTitle>
        {description && <CardDescription className="text-center">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center">{children}</CardContent>
    </Card>
  );
}
