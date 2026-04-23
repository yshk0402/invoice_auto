# TASK.md

外国人派遣事業者向け経費申請SaaS 要件確定バックログ

## 0. 運用ルール

- [ ] T-0001 `REQUIREMENTS.md` を仕様の唯一ソースとして運用する。Trace: REQUIREMENTS §0
- [ ] T-0002 仕様変更時は `REQUIREMENTS.md` を先に更新し、その後に `AGENTS.md` と `TASK.md` を同期する。Trace: REQUIREMENTS §0, §10 / AGENTS §1, §2
- [ ] T-0003 新規タスク追加時は必ず `Trace:` を付け、要件節番号または `CR-*` に紐づける。Trace: AGENTS §1, §5
- [ ] T-0004 `CONFIRM REQUIRED` を推測で埋めず、ユーザー確認後にのみ解消する。Trace: REQUIREMENTS §9 / AGENTS §1, §3

## 1. Phase 1: 未確定事項の確認

- [x] T-1001 Google スプレッドシートの列定義を確認する。Trace: REQUIREMENTS §6.1 / CR-01
  - 2026-03-12 確定: `Master Sheet` は `employee_id` `user_name` `role` `preferred_language` `sheet_tab_name` `active`。`Per-user Sheet Tab` は `submitted_at` `date` `merchant` `amount` `expense_category` `receipt_image` `submitter` `language`。
- [x] T-1002 `Master Sheet` と `Per-user Sheet Tab` のタブ命名規則と責務分担を確認する。Trace: REQUIREMENTS §5.1, §6.1 / CR-01
  - 2026-03-12 確定: `Master Sheet` はユーザー台帳とタブ対応表、`Per-user Sheet Tab` はユーザー単位の提出一覧。命名規則は `USER_<社員ID>`。
- [x] T-1003 `expense_category` の候補値、管理責任者、更新ルールを確認する。Trace: REQUIREMENTS §6.2 / CR-02
  - 2026-03-12 確定: 候補値は `transportation` `meal` `supplies` `lodging` `communication` `other`。管理責任者は経理部。更新は `Master Sheet` 更新で行う。
- [ ] T-1004 アカウント発行フロー、初期パスワード配布方法、再設定方法を確認する。Trace: REQUIREMENTS §5.3 / CR-03
  - 2026-03-12 確定: PoC用固定アカウントを `id1` / `pass1` から `id5` / `pass5` まで用意する。パスワード再設定フローは v1 で提供しない。追加発行と再発行は未確定。
- [x] T-1005 レシート画像の保存先、保持期間、閲覧権限を確認する。Trace: REQUIREMENTS §7 / CR-04
  - 2026-03-12 確定: 保存先は Google Drive 内の所定フォルダ、PoC期間中は保持期間を定めない。閲覧権限は共有フォルダ権限に従う。
- [ ] T-1006 監査ログの対象イベント、保持期間、閲覧権限を確認する。Trace: REQUIREMENTS §7 / CR-05
- [x] T-1007 言語切替UX、初期表示言語、切替タイミングを確認する。Trace: REQUIREMENTS §5.2 / CR-06
  - 2026-03-12 確定: 初期表示言語は端末言語優先。言語切替はログイン前後で可能。
- [ ] T-1008 OCR サービス選定の評価基準とPoC方法を確認する。Trace: REQUIREMENTS §4, §7 / CR-07
- [ ] T-1009 提出期限、月次締め処理、遅延提出時の運用を確認する。Trace: REQUIREMENTS §4 / CR-08
- [ ] T-1010 提出完了率向上の基準値、目標値、測定期間を確認する。Trace: REQUIREMENTS §8 / CR-09
- [x] T-1011 `Employee` と `ForeignWorker` の画面差分・権限差分の有無を確認する。Trace: REQUIREMENTS §3, §5.2 / CR-10
  - 2026-03-12 確定: v1 では画面・入力・権限差分なし。

## 2. Phase 2: 画面・シート仕様の具体化

- [ ] T-2001 `Login` 画面の入力仕様、失敗時表示、アカウント関連導線を要件化する。Trace: REQUIREMENTS §5.3 / CR-03
  - 2026-03-12 部分確定: 入力は `社員ID` `パスワード`。ログイン画面で言語切替可能。成功時は `Camera Scan` へ遷移。サインアップ導線とパスワード再設定導線は設けない。失敗表示の詳細文言、追加発行、再発行は未確定。
- [ ] T-2002 `Camera Scan` 画面の再撮影、失敗時挙動、送信前確認動線を要件化する。Trace: REQUIREMENTS §5.4
  - 2026-03-12 部分確定: レシート 1 枚を撮影し、撮影後は `OCR Correction / Submit` へ遷移する。再撮影と失敗時挙動は未確定。
- [ ] T-2003 `OCR Correction / Submit` 画面の入力ルール、確認項目、送信完了条件を要件化する。Trace: REQUIREMENTS §5.5, §6.2
  - 2026-03-12 部分確定: 修正対象は `date` `amount` `merchant` `expense_category`。送信時に `receipt_image` `submitter` `submitted_at` `language` を保持する。完了表示、バリデーション、未入力時の扱いは未確定。
- [x] T-2004 管理側 Google スプレッドシートの閲覧・集計フローを要件化する。Trace: REQUIREMENTS §4, §5.1, §6.1 / CR-01
  - 2026-03-12 確定: `Master Sheet` で対象ユーザーとタブを特定し、`Per-user Sheet Tab` で提出一覧を確認し、月次集計は Google スプレッドシート上で行う。管理側専用Web画面は初版で提供しない。
- [ ] T-2005 多言語文言の管理方法と翻訳反映フローを要件化する。Trace: REQUIREMENTS §3, §5.2 / CR-06
  - 2026-03-12 部分確定: ユーザー向け固定文言は 4 言語をそろえ、管理側向け文言は日本語のみ。翻訳文言の管理方法と更新フロー詳細は未確定。

## 3. Phase 3: 技術設計・PoC準備

- [x] T-3001 OCR 補助前提に沿った技術検証観点を定義する。Trace: REQUIREMENTS §2.1, §7 / CR-07
  - 2026-03-12 確定: OCR は `date` `amount` `merchant` `expense_category` の入力補助に限定し、人確認前提とする。ベンダー選定や精度基準は `CR-07` 解消まで決め打ちしない。
- [x] T-3002 レシート画像クラウド保存の設計観点を整理する。Trace: REQUIREMENTS §2.1, §7 / CR-04
  - 2026-03-12 確定: `receipt_image` は参照情報として保持し、画像保存先は Google Drive 所定フォルダに限定する。接続詳細は実共有フォルダ前提で決める。
- [x] T-3003 Google スプレッドシート連携の設計境界を整理する。Trace: REQUIREMENTS §5.1, §6.1 / CR-01
  - 2026-03-12 確定: 管理側UIは Google スプレッドシート固定とし、`Master Sheet` と `Per-user Sheet Tab` の契約列にのみ連携する。
- [x] T-3004 `社員ID + パスワード` 前提の認証・アカウント運用設計観点を整理する。Trace: REQUIREMENTS §3, §5.3 / CR-03
  - 2026-03-12 確定: PoC は固定 5 アカウント前提、サインアップと再設定は対象外。追加発行と再発行は未確定のまま実装対象外とする。
- [x] T-3005 監査ログとアクセス管理の設計観点を整理する。Trace: REQUIREMENTS §7 / CR-05
  - 2026-03-12 確定: 監査ログは `CR-05` 解消まで契約機能として実装しない。アクセス管理は Google Drive / Google スプレッドシートの共有権限前提とする。
- [x] T-3006 Vercel 公開PoC向けに、ローカル常駐サーバー依存を排除し、Serverless Function 構成へ置き換える。 Trace: REQUIREMENTS §4, §7 / CR-04
  - 2026-04-23 対応: `GET /api/bootstrap` `POST /api/login` `POST /api/submit` の最小 API に整理し、`runtime/` へのローカル保存を廃止。
- [x] T-3007 Google Drive / Google スプレッドシート実保存を、共有PoC向けの最小契約で接続する。 Trace: REQUIREMENTS §5.1, §6.1, §6.2, §7 / CR-01, CR-04
  - 2026-04-23 対応: 画像は Google Drive フォルダへ保存し、提出データは `Master Sheet` 参照の上で `USER_<社員ID>` タブへ追記する。
- [x] T-3008 共有PoCで危険な公開リセット導線を外す。 Trace: REQUIREMENTS §4 / AGENTS §1, §4
  - 2026-04-23 対応: `POST /api/reset` と「デモデータ削除」UI を削除。

## 4. Phase 4: 実装準備と受入条件整理

- [ ] T-4001 解消済み `CR-*` を意思決定ログへ反映し、`REQUIREMENTS.md` を更新する。Trace: REQUIREMENTS §9, §10
- [ ] T-4002 `CONFIRM REQUIRED` が残る状態で実装に進もうとしている項目を洗い出し、ブロックする。Trace: REQUIREMENTS §9 / AGENTS §2, §4
- [ ] T-4003 初版の受入条件を、提出完了率向上の測定条件を含めて整理する。Trace: REQUIREMENTS §8 / CR-09
- [ ] T-4004 実装キックオフ前に、全タスクのトレース先が有効かをレビューする。Trace: AGENTS §5, §7
- [ ] T-4005 初版スコープ外の機能が混入していないかをレビューする。Trace: REQUIREMENTS §2.2 / AGENTS §1, §4

## 5. 実装着手条件マトリクス

| 実装ブロック | 着手可否 | 依存する要件/未確定事項 | 現時点の扱い |
| --- | --- | --- | --- |
| 多言語UI骨組み | 条件付きで着手可 | REQUIREMENTS §3, §5.2 / `CR-06` | 端末言語優先、ログイン前後で切替可能の前提で画面構造設計のみ着手可 |
| スマホ画面遷移モック | 条件付きで着手可 | REQUIREMENTS §4, §5.2, §5.3, §5.4, §5.5 / `CR-03`, `CR-06` | 認証詳細を決め打ちせず、`Login` -> `Camera Scan` -> `OCR Correction / Submit` の導線整理まで可 |
| 提出データモデル最低契約 | 条件付きで着手可 | REQUIREMENTS §6.2 / `CR-02` | 契約済み8項目のみで整理可。経費科目候補値やバリデーションは未実装 |
| 認証本実装 | 条件付きで着手可 | REQUIREMENTS §3, §5.3 / `CR-03` | PoC用固定アカウントでの認証は着手可。追加発行や再発行は未確定のため実装対象外 |
| OCR実装/PoC固定 | すぐ着手不可 | REQUIREMENTS §2.1, §4, §7 / `CR-07` | OCRベンダー選定や評価基準の確定待ち |
| レシート画像保存実装 | 条件付きで着手可 | REQUIREMENTS §2.1, §7 / `CR-04` | Google Drive 所定フォルダへの保存は着手可。実フォルダ共有と接続設定はユーザー作業待ち |
| Google スプレッドシート本連携 | 条件付きで着手可 | REQUIREMENTS §5.1, §6.1 / `CR-01` | 列定義、タブ命名規則、責務は確定済み。Google API接続や権限設定は別途確認の上で着手 |
| 経費科目マスタ連携 | 条件付きで着手可 | REQUIREMENTS §6.2 / `CR-02` | 候補値、管理責任者、更新ルールは確定済み。詳細バリデーションは未確定のまま固定しない |
| 監査ログ/アクセス管理実装 | すぐ着手不可 | REQUIREMENTS §7 / `CR-05` | 対象イベント、保持期間、閲覧権限の確定待ち |
| 締め処理/期限表示を含む業務UI | すぐ着手不可 | REQUIREMENTS §4 / `CR-08` | 提出期限、月次締め、遅延提出運用の確定待ち |
| 受入条件/成功指標固定 | すぐ着手不可 | REQUIREMENTS §8 / `CR-09` | 基準値、目標値、測定期間の確定待ち |

## 6. ユーザー確認待ち項目

- [x] T-5001 `CR-01` として、Google スプレッドシートの列定義、タブ命名規則、`Master Sheet` と `Per-user Sheet Tab` の責務を確認する。Trace: REQUIREMENTS §5.1, §6.1 / CR-01
- [x] T-5002 `CR-02` として、`expense_category` の候補値、管理責任者、更新ルールを確認する。Trace: REQUIREMENTS §6.2 / CR-02
- [x] T-5003 `CR-03` として、社員ID発行、初期パスワード配布、再設定運用を確認する。Trace: REQUIREMENTS §3, §5.3 / CR-03
- [x] T-5004 `CR-04` として、レシート画像の保存先、保持期間、閲覧権限を確認する。Trace: REQUIREMENTS §7 / CR-04

## 7. 進行ゲート

- [ ] G-0001 Phase 1 の `CR-*` 確認が未完了の状態では、実装仕様を確定しない。Trace: REQUIREMENTS §9 / AGENTS §2
- [ ] G-0002 `REQUIREMENTS.md` に反映されていない決定事項を前提に、設計・実装を開始しない。Trace: REQUIREMENTS §0 / AGENTS §2
- [ ] G-0003 Google スプレッドシート前提と多言語スマホUXを壊す変更は、要件更新なしに進めない。Trace: REQUIREMENTS §3, §5.1, §5.2 / AGENTS §1, §4
