import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MaterialLinkProps {
  title: string;
  url: string;
}

const MaterialLink = ({ title, url }: MaterialLinkProps) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="w-full"
    >
      <div className="flex items-center justify-start gap-x-2">
        <ExternalLink size={20} />
        <h4>{title}</h4>
      </div>
    </Link>
  );
};

export default MaterialLink;
