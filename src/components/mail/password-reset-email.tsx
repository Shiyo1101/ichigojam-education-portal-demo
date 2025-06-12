import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

import Footer from '@/components/mail/footer';

export default function PasswordResetEmail(email: string, resetLink: string) {
  return (
    <Html>
      <Head />
      <Preview>パスワード再設定</Preview>
      <Tailwind>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8"></Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              【講師向けポータル】パスワードの再設定リンクの送信
            </Heading>

            <Text className="ml-1 text-sm leading-4 text-black">
              ◆このメールは、クリエイティブ教育都市事業講師向けポータルサイトのパスワードリセット時にご入力いただいたメールアドレス宛に自動的にお送りしています。
              <br />
              <Link
                href={resetLink}
                className="font-medium text-blue-600 no-underline"
              >
                こちらのリンクをクリックして
              </Link>
              パスワードのリセットを完了してください。
            </Text>
          </Container>
          <Footer email={email} />
        </Body>
      </Tailwind>
    </Html>
  );
}
