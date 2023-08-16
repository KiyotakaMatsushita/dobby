import { ai_fn } from "./core/ai_fn.ts";
import { OpenAI } from "./core/provider/openai.ts";

class MyDobby {
  @ai_fn({ model: OpenAI.MODELS.GPT35TURBO })
  GPT(content: string): string {
    return content;
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
const instance = new MyDobby();

export function GPT(content: string): string {
  return instance.GPT(content) || "";
}

export function copywriting_for_listing_advertising(order: string): string {
  const background = order.match(/#前提: (.*)/)?.[1] || "";
  const advertiser = order.match(/#広告主: (.*)/)?.[1] || "";
  const product = order.match(/#販売商品: (.*)/)?.[1] || "";
  const prohibited_words = order.match(/#禁止ワード: (.*)/)?.[1] || "";
  return instance.copywriting_for_listing_advertising({
    background,
    advertiser,
    product,
    prohibited_words,
  }) || "";
}
