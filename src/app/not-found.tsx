import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const runtime = 'edge';

const NotFoundPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <h1 className="text-2xl font-bold">404 - ページが見つかりません</h1>
        </CardHeader>
        <CardContent className="whitespace-pre-wrap">
          <p>申し訳ありませんが、リクエストされたページは存在しません。</p>
          <p>URLが正しいか、ページが削除された可能性があります。</p>

          <Link
            href="/"
            className="hover:underline"
          >
            <Button className="mt-4">トップページへ戻る</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
};

export default NotFoundPage;
