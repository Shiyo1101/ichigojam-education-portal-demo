import { Users } from 'lucide-react';

export const AdminPage = {
  users: '/admin/users',
  // document: '/admin/document',
  // videos: '/admin/videos',
  // slides: '/admin/slides',
} as const;

export type AdminPageType = keyof typeof AdminPage;

export const AdminNavItems = [
  { name: 'ユーザー管理', path: AdminPage.users, icon: Users },
  // { name: 'ドキュメント', path: AdminPage.document, icon: BookText },
  // { name: '動画', path: AdminPage.videos, icon: Video },
  // { name: 'スライド', path: AdminPage.slides, icon: Presentation },
];
