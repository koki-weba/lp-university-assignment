/**
 * Flowise 設定（index.html にも同じ内容を記載）
 * ローカル確認は index.html を HTTP サーバー経由で開いてください（file:// では表示されません）
 */
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";

Chatbot.init({
  chatflowid: "de35a304-2761-48a2-9def-0707e6b773bc",
  apiHost: "https://cloud.flowiseai.com",
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
      welcomeMessage: "こんにちは。チャイナエアラインについてお気軽にお尋ねください。",
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
