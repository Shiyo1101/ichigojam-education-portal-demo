# プログラミング教育支援用ポータルサイト（デモ版）

福井県鯖江市の小学校で行われている [IchigoJam](https://ichigojam.net/) を使ったプログラミング教育の講師向けポータルサイトです。

[参考：IchigoJam使ったプログラミング教育](https://ichigojam.net/edu/case/sabae-city.html)

---

## デモサイト使い方

[https://ichigojam-education-portal-demo.vercel.app/](https://ichigojam-education-portal-demo.vercel.app/)

### ログイン情報

- Mail：dummy.uchida@dummy.test
- Pass：password

> [!WARNING]
>
> - デモサイト内でパスワードの変更可能ですが、行わないでください。
> - メールサービスであるResendは使用不可にしているため、新規アカウント登録および、メールアドレス変更は出来ません。

## 主な技術スタック

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**：シンプルなUIを素早く開発するために使用。
- **React Hook Form**：効率的なフォーム管理に使用。
- **Zod**：フォーム入力時の型安全なバリデーションを行うために使用。
- **Prisma**：ORMとして使用。
- **Auth.js v5**：認証・認可・アクセスコントロール機能の実装に使用。
- **Resend**：メール送信サービス。アカウントの登録や変更時のメール送信・メールアドレス認証で使用。
- **Supabase**：PostgreSQLベースのクラウドDB。ローカル開発はDockerで再現可能。
- **ESLint / Prettier**：コード品質維持のための静的解析・フォーマッターとして使用。

---

## 必要な事前準備

以下のツールを事前にインストールしてください：

1. **Node.js**

   - 推奨バージョン: 最新のLTS版
   - [Node.js公式サイト](https://nodejs.org/)

2. **Docker**

   - Supabaseのコンテナ作成・起動に必要です。Windowsの場合、WSLが必要
   - [Docker公式サイト](https://www.docker.com/)

3. **Supabase CLI**
   - ローカル環境にSupabaseを構築することができます。
   - [Supabase公式サイト](https://supabase.com/docs/guides/local-development/cli/getting-started)

## 環境構築手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/Shiyo1101/ichigojam-education-portal-demo.git
cd ichigojam-education-portal-demo
```

### 2. 必要なパッケージのインストール

プロジェクトディレクトリ直下で以下を実行

```bash
npm install
```

### 3. Docker（Supabase）コンテナの起動

Supabase CLIを使用した開発環境用データベースを起動するために、以下を実行してください：

```bash
supabase start
```

> [!WARNING]
> 裏側でDockerを起動しておく必要があります。

### 4. 環境変数の設定

`.env.sample` ファイルを参考に `.env` ファイルを作成し、必要な値を設定してください。

```bash
cp .env.sample .env
```

例:

```properties
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
```

### 5. Prismaのセットアップ

データベーススキーマを適用し、Prismaクライアントを生成します。
立ち上げたローカルのSupabase DBにスキーマをマイグレートします。

```bash
npm run prisma:gen
npm run prisma:migrate:dev
```

### 6. DB反映確認

ブラウザで以下のURLにアクセスすると、ローカルのSupabaseにアクセスできます。
Table Editorページにてスキーマが反映されていることを確認します。

```bash
http://127.0.0.1:54323/
```

---

## 開発サーバーの起動

以下のコマンドで開発サーバーを起動します：

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして動作を確認してください。

---

## その他のコマンド

### Linterの実行

コードの静的解析を行うには以下を実行してください：

```bash
npm run lint
```

修正も同時に行うには以下を実行して下さい：

```bash
npm run lint:fix
```

### Formatの実行

プロジェクトコード全体のFormatを行うには以下を実行して下さい：

```bash
npm run format
```

### ビルド

本番環境用にビルドするには以下を実行してください：

```bash
npm run build
```

> [!NOTE]
> ここエラーが発生する場合、デプロイの際にも同様に失敗するので、正しくビルドが実行されるようになるまでリモートリポジトリへのプッシュは避けてください。

---

## トラブルシューティング

- **Dockerコンテナが起動しない場合**:

  - Dockerが正しくインストールされているか確認してください。
  - ポートの競合が発生していないか確認してください（例: `54322`）。

- **環境変数のエラーが発生する場合**:
  - `.env` ファイルが正しく設定されているか確認してください。

---
