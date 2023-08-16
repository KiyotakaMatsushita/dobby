# Dobby
## 概要
Dobbyは、GASにOpenAIを導入し、様々な便利なユーザ定義関数を作成することを目的としています。このリポジトリは、屋敷しもべ妖精Dobbyのように、ご主人さまの仕事を支援するパートナーを生み出すことを目指しています。

## 主な機能
* OpenAIのAPIを使用して、様々なユーザ定義関数を提供
* メッセージの生成や応答のための関数を提供
* OpenAIのモデルを利用して、特定のタスクを実行するための関数を提供


## 使用方法
* src/config.ts でOpenAIのAPIキーを設定
* src/index.ts で提供される関数を利用して、特定のタスクを実行
* 必要に応じて、src/core 内の関数やモデルをカスタマイズ


## ファイル構成
* src/config.ts: OpenAIのAPIキーの設定
* src/core/ChatCompletion/message.ts: メッセージの生成関数
* src/core/ai_fn.ts: AI関数の定義
* src/core/llm_model.ts: OpenAIのモデルの定義
* src/core/provider/openai.ts: OpenAIのAPIを利用するためのクラス
* src/index.ts: 主要な関数やクラスのエクスポート

## ライセンス
MIT

