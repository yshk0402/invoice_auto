# invoice_auto

外国人派遣事業者向け経費申請SaaS の PoC リポジトリです。

現時点では、要件確定ドキュメントと、ブラウザだけで動く静的デモを含みます。

## Files

- `REQUIREMENTS.md`: 要件定義
- `TASK.md`: 要件確定と実装準備のバックログ
- `index.html`: デモ画面
- `styles.css`: デモ用スタイル
- `app.js`: デモ用ロジック

## Demo

ビルドは不要です。静的ファイルをそのまま配信すれば動きます。

例:

```bash
python3 -m http.server 4173
```

その後、`http://localhost:4173` を開きます。

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
- Google スプレッドシート想定データのプレビュー

## Not Yet Connected

- Google Drive 実保存
- Google スプレッドシート実連携
- 本番認証基盤
- OCR ベンダー実接続
