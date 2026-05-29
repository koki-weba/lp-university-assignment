/**
 * Flowise チャットボット埋め込み設定
 *
 * 1. Flowise でチャットフローを作成
 * 2. チャットフロー画面の「Embed」タブを開く
 * 3. chatflowid と apiHost をコピーして下に貼り付け
 *
 * ローカル: apiHost は http://localhost:3000
 * Flowise Cloud: Embed タブに表示された URL をそのまま使用
 */
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";

var CHATFLOW_ID = "de35a304-2761-48a2-9def-0707e6b773bc";
var API_HOST = "https://cloud.flowiseai.com";

if (!CHATFLOW_ID || CHATFLOW_ID === "YOUR_CHATFLOW_ID_HERE") {
  console.info(
    "[Flowise] flowise-config.js: CHATFLOW_ID を設定するとチャットボットが表示されます。"
  );
} else {
  Chatbot.init({
    chatflowid: CHATFLOW_ID,
    apiHost: API_HOST,
    theme: {
      button: {
        backgroundColor: "#f08800",
        right: 24,
        bottom: 24,
        size: 56,
        iconColor: "#ffffff",
      },
      chatWindow: {
        title: "チャイナエアライン AIサポート",
        welcomeMessage:
          "こんにちは。チャイナエアラインについてお気軽にお尋ねください。",
        titleBackgroundColor: "#f08800",
        titleTextColor: "#ffffff",
        backgroundColor: "#ffffff",
        height: 520,
        width: 400,
        fontSize: 15,
        botMessage: {
          backgroundColor: "#fff8e8",
          textColor: "#1a1a1a",
        },
        userMessage: {
          backgroundColor: "#f08800",
          textColor: "#ffffff",
        },
      },
    },
  });
}
