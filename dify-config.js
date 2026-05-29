/**
 * Dify チャットボット埋め込み設定
 *
 * 1. Dify でチャットボットアプリを作成・公開する
 * 2. 「公開」→「サイトに埋め込む」からトークンをコピー
 * 3. 下の DIFY_TOKEN に貼り付けて保存
 *
 * クラウド版: https://cloud.dify.ai または https://udify.app
 * セルフホスト版: DIFY_BASE_URL を自分の Dify の URL に変更
 */
(function () {
  "use strict";

  var DIFY_TOKEN = "USXebj6Z4YMJXBAU";
  var DIFY_BASE_URL = "https://udify.app";

  if (!DIFY_TOKEN || DIFY_TOKEN === "YOUR_DIFY_TOKEN_HERE") {
    return;
  }

  window.difyChatbotConfig = {
    token: DIFY_TOKEN,
    baseUrl: DIFY_BASE_URL,
    systemVariables: {},
    containerProps: {
      style: {
        right: "24px",
        bottom: "24px",
      },
      className: "dify-chatbot-bubble-button--china-airlines",
    },
  };

  var script = document.createElement("script");
  script.src = DIFY_BASE_URL + "/embed.min.js";
  script.id = DIFY_TOKEN;
  script.defer = true;
  document.body.appendChild(script);
})();
