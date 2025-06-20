import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const runtime = 'edge';

const GuestPage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>ゲストページ</CardTitle>
          <CardDescription>あなたは現在ゲストユーザーです</CardDescription>
        </CardHeader>
        <CardContent className="whitespace-pre-wrap">
          <p>プログラミング支援 ポータルサイトへのご登録ありがとうございます。</p>
          <p>現在、管理者からの利用承認待ちです。</p>
          <p>
            お手数ですが、プログラミング支援のMessangerグループに登録した旨の連絡をいただけますと幸いです。
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default GuestPage;
