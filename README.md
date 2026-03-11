# invoice_auto

外国人派遣事業者向け経費申請SaaS の PoC リポジトリです。

現時点では、要件確定ドキュメントと、ローカルサーバー上で動くスマホ向けデモを含みます。

## Files

- `REQUIREMENTS.md`: 要件定義
- `TASK.md`: 要件確定と実装準備のバックログ
- `index.html`: スマホ用デモ画面
- `styles.css`: スマホ用スタイル
- `app.js`: スマホ用ロジック
- `server.js`: デモサーバー

## Demo

ビルドは不要です。Node.js でローカルサーバーを起動します。

例:

```bash
cp .env.example .env
npm run start
```

その後、スマホまたはブラウザで `http://localhost:4173` を開きます。

管理側の確認用ファイル:

- Master Sheet CSV: `http://localhost:4173/api/master-sheet.csv`
- Per-user Sheet Tab CSV: `http://localhost:4173/api/per-user/USER_id1.csv`

## Environment Variables

`.env.example` をコピーして `.env` を作成します。

- `PORT`: ローカル起動ポート
- `ENABLE_GOOGLE_SYNC`: `true` にすると Google 接続用 env の存在を起動時に検証
- `GOOGLE_CLIENT_EMAIL`: サービスアカウントの client email
- `GOOGLE_PRIVATE_KEY`: サービスアカウント秘密鍵。改行は `\n` で設定
- `GOOGLE_SPREADSHEET_ID`: 接続先スプレッドシート ID
- `GOOGLE_DRIVE_FOLDER_ID`: 接続先 Drive フォルダ ID

現時点では env の受け口とバリデーションのみ実装済みで、実際の Google API 書き込みはまだ未接続です。

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
- サーバー側への画像保存
- ユーザー別 CSV 出力

## Not Yet Connected

- Google Drive 実保存
- Google スプレッドシート実連携
- 本番認証基盤
- OCR ベンダー実接続
