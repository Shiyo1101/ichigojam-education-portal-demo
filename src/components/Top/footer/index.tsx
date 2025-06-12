import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="h-16 py-2 border-t flex flex-col items-center container">
      <p className="text-sm lg:text-base">CC BY プログラミング支援 講師向けポータルサイト</p>
      <p className="text-sm lg:text-base">
        ©︎ 2024{` `}
        <Link
          href="https://www.l-community.com/"
          target="_blank"
          className="underline"
        >
          NPO法人エル・コミュニティ
        </Link>
        <span className="text-xs lg:text-sm">{` `}All Rights Reserved</span>
      </p>
    </footer>
  );
};

export default Footer;
