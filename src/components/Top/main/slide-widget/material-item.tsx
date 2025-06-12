import Link from 'next/link';
import React from 'react';

interface MaterialItemProps {
  title: string;
  fileName: string;
  fileType: 'pdf' | 'pptx';
}

const MaterialItem = ({ title, fileName, fileType }: MaterialItemProps) => {
  const filePath = `/material/${fileName}.${fileType}`;

  return (
    <div className="flex flex-col justify-center">
      <Link
        href={filePath}
        target="_blank"
      >
        {title}を別タブで開く
      </Link>
      <object
        data={filePath}
        type="application/pdf"
      />
    </div>
  );
};

export default MaterialItem;
