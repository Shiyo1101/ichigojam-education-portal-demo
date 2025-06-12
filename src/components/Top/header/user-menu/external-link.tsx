import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ExternalLinkProps {
  title: string;
  url: string;
}

const ExternalLink = ({ title, url }: ExternalLinkProps) => {
  return (
    <div className="py-2 hover:bg-muted">
      <Link
        href={url}
        target="_blank"
        className="underline"
      >
        <div className="flex items-center justify-between">
          <h4>{title}</h4>
          <ArrowRight size={20} />
        </div>
      </Link>
    </div>
  );
};

export default ExternalLink;
