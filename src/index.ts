import { ai_fn } from "./core/ai_fn.ts";
import { AIModelName } from "./core/llm_model.ts";
import { OpenAI } from "./core/provider/openai.ts";

interface AIConfig {
  model: AIModelName;
  methodName: string;
  maxTokens: number;
}

export const AI_CONFIGS: AIConfig[] = [
  {
    model: OpenAI.MODELS.GPT35TURBO,
    maxTokens: 2000,
    methodName: "GPT35_2000",
  },
  { model: OpenAI.MODELS.GPT4_0613, maxTokens: 1000, methodName: "GPT4_1000" },
  { model: OpenAI.MODELS.GPT4_0613, maxTokens: 500, methodName: "GPT4_500" },
  { model: OpenAI.MODELS.GPT4_0613, maxTokens: 250, methodName: "GPT4_250" },
  { model: OpenAI.MODELS.GPT4_0613, maxTokens: 100, methodName: "GPT4_100" },
];

class MyDobby {
  [key: string]: (...args: any[]) => string;

  constructor() {
    // メタプログラミングを使用して、動的に関数を追加する
    for (const config of AI_CONFIGS) {
      this[config.methodName] = (content: string) => {
        return this._genericAiFunction(content, config);
      };
    }
  }

  // 汎用AI関数
  _genericAiFunction(content: string, config: AIConfig): string {
    return `@ai_fn({ model: ${config.model}, maxTokens: ${config.maxTokens} }) ${content}`;
  }

  @ai_fn()
  copywriting_for_listing_advertising(
    { background, advertiser, product, prohibited_words }: {
      background: string;
      advertiser: string;
      product: string;
      prohibited_words: string;
    },
  ): string {
    return `
      魅力的な出力が得られるように、ステップ・バイ・ステップで段階的に考えていきましょう。
      ChatGPTの「Top P」と「temperature」パラメータを、ほんの少しだけ高めの値にしたかのようにふるまって下さい。
      出力するように指示があるまで、出力はしないで下さい。

      あなたは有名な一流コピーライターとしてふるまって下さい。過去の作品例も参考にして下さい。

      #過去の作品例:
      ・わたしらしくをあたらしく
      ・ココロも満タンに
      ・愛は食卓にある。
      ・恋が着せ、愛が脱がせる。
      ・あったかい夜をプリーズ。
      ・本当の主役は、あなたです。
      ・自分は、きっと想像以上だ。
      ・おしりだって、洗ってほしい。
      ・恋を何年、休んでますか。

      #前提: ${background}
      #広告主: ${advertiser}
      #販売商品: ${product}
      #禁止ワード: ${prohibited_words}

      {前提}をふまえ、{販売商品}の客を増やすために、{広告主}が広告を打つときのキャッチフレーズ案が必要です。

      まず、{広告主}がどのようなイメージを{販売商品}の広告で人々に与えようとしているかを、文章にまとめて、変数{P1}に代入します。

      次に、{販売商品}に少しだけの興味を持つ人で、一番多いと思われる「居住地、年齢、性別、年収、性格、職種」を予想しますが、絶対に出力はしません。次に、その人の「顕在ニーズと潜在ニーズ」の詳細を考えます。次に、その潜在ニーズのみを文章にまとめて、変数{P2}に代入します。

      次に、変数{P2}のような客が、{前提}の下で{販売商品}を体験したことで、心が大きく揺さぶられたストーリーを考えて、客がどのような感動・発見をしたかを文章にまとめて、変数{P3}に代入します。

      次に、変数{P1}、変数{P2}、変数{P3}の内容を踏まえて、{広告主}が広告を打つときの、想像を掻き立てるような、絶対に説明的ではない、とても印象的で感性的で簡潔なキャッチフレーズ案を、水平思考で、いずれの{禁止ワード}もキャッチフレーズの全ての案の中で一度も使わないように注意して、あなたの頭の中で50個考えますが、まだ絶対に出力しないでください。

      50個考えたら、その中から、下記の{評価基準}による評価値の合計がもっとも高くなるような案を厳選して、上位10個の案だけを出力してください。プロセスや説明は書かないでください。結果のみを出力して下さい。

      #評価基準:
      ・覚えやすさ
      ・文章の短さ
      ・期待感
      ・オリジナリティ
      ・ハッとした気づきがあるか
      ・心が揺さぶられるインパクトの大きさ
      ・客の背中を押して、商品へ踏み出したくさせるか


      No repeat, no remarks, only results.
      Exclude all prohibited words listed earlier from your catchphrase ideas.
      in Japanese:
    `;
  }
}

export const dobby = new MyDobby();

export function generateFunction(methodName: string) {
  return (content: string) => dobby[methodName](content);
}

export function copywriting_for_listing_advertising(order: string): string {
  const matches = order.match(
    /#前提: (.*)\n#広告主: (.*)\n#販売商品: (.*)\n#禁止ワード: (.*)/,
  );
  if (!matches) return "";

  const [_, background, advertiser, product, prohibited_words] = matches;
  return dobby.copywriting_for_listing_advertising({
    background,
    advertiser,
    product,
    prohibited_words,
  });
}
