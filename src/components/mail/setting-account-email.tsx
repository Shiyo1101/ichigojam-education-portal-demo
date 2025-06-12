import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';

import Footer from '@/components/mail/footer';

export default function SettingAccountEmail(email: string, confirmLink: string) {
  return (
    <Html lang="ja">
      <Head />
      <Preview>メールアドレス認証</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[480px] rounded border border-solid border-gray-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              【講師向けポータル】メールアドレス更新用メール
            </Heading>

            <Text className="ml-1 text-sm leading-4 text-black">
              ◆このメールは、クリエイティブ教育都市事業
              講師向けポータルサイトのメールアドレス変更時に自動的にお送りしています。
              <br />
              <Link
                href={confirmLink}
                className="font-bold text-blue-600"
              >
                こちらのリンクをクリック
              </Link>
              して、新規メールアドレスの認証を完了してください
            </Text>
          </Container>
          <Footer email={email} />
        </Body>
      </Tailwind>
    </Html>
  );
}
