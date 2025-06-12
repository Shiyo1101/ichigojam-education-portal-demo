import { Menu } from 'lucide-react';

import ExternalLink from '@/components/Top/header/user-menu/external-link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const UserMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>外部リンクメニュー</SheetTitle>
          <SheetDescription>クリックすると新規タブが開きます</SheetDescription>
        </SheetHeader>
        <ul className="mt-2 list-none h-auto">
          <ExternalLink
            title="総合学習報告フォーム"
            url="https://github.com/Shiyo1101"
          />
          <ExternalLink
            title="クラブ活動報告フォーム"
            url="https://github.com/Shiyo1101"
          />
          <ExternalLink
            title="Facebookグループ（写真投稿）"
            url="https://github.com/Shiyo1101"
          />
          <ExternalLink
            title="参考資料（福野さんGithub）"
            url="https://github.com/IchigoJam/slide"
          />
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;
