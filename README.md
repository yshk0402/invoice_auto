# invoice_auto

外国人派遣事業者向け経費申請SaaS の PoC リポジトリです。

現時点では、要件確定ドキュメントと、Vercel で公開できるスマホ向け PoC を含みます。

## Files

- `REQUIREMENTS.md`: 要件定義
- `TASK.md`: 要件確定と実装準備のバックログ
- `index.html`: スマホ用デモ画面
- `styles.css`: スマホ用スタイル
- `app.js`: スマホ用ロジック
- `api/`: Vercel Serverless Functions
- `lib/`: API 共通ロジック

## Vercel Deploy

ビルドは不要です。静的ファイルと `api/` をそのまま Vercel へデプロイします。

1. Google 側の準備を行います。
   - Google Drive の保存先フォルダを作成する
   - Google スプレッドシートを用意し、`Master Sheet` と `USER_<社員ID>` タブを作成する
   - サービスアカウントを作成し、対象の Drive フォルダとスプレッドシートへ編集権限を付与する
2. Vercel に次の環境変数を設定します。
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SPREADSHEET_ID`
   - `GOOGLE_DRIVE_FOLDER_ID`
3. Vercel へデプロイします。

```bash
npx vercel
```

本番反映する場合:

```bash
npx vercel --prod
```

ローカルで Vercel と同じ実行方式を確認する場合:

```bash
cp .env.example .env.local
npx vercel dev
```

その後、ブラウザで表示されたローカル URL を開きます。

## Environment Variables

`.env.example` をコピーして `.env.local` を作成します。

- `GOOGLE_CLIENT_EMAIL`: サービスアカウントの client email
- `GOOGLE_PRIVATE_KEY`: サービスアカウント秘密鍵。改行は `\n` で設定
- `GOOGLE_SPREADSHEET_ID`: 接続先スプレッドシート ID
- `GOOGLE_DRIVE_FOLDER_ID`: 接続先 Drive フォルダ ID

起動時の `GET /api/bootstrap` は、Google 接続設定が不足していても 500 ではなく不足項目を返します。

## Demo Accounts

- `id1 / pass1`
- `id2 / pass2`
- `id3 / pass3`
- `id4 / pass4`
- `id5 / pass5`

## Current Scope

- スマホ向け PoC フロー
  - `Login`
  - `Camera Scan`
  - `OCR Correction / Submit`
- 多言語切替
- モック OCR
- Google Drive への画像保存
- Google スプレッドシートの `USER_<社員ID>` タブへの追記

## Google Sheet Expectations

- `Master Sheet` の列:
  - `employee_id`
  - `user_name`
  - `role`
  - `preferred_language`
  - `sheet_tab_name`
  - `active`
- `Per-user Sheet Tab` の列:
  - `submitted_at`
  - `date`
  - `merchant`
  - `amount`
  - `expense_category`
  - `receipt_image`
  - `submitter`
  - `language`

## Not Yet Connected

- 本番認証基盤
- OCR ベンダー実接続
- 監査ログ
