import { defineCustomElement } from "vue";
import "@repo/ui/design-system.css";
import LiveScore from "./LiveScore.ce.vue";

// Chuyển đối file Vue thành một Custom Element constructor của Vue
const LiveScoreElement = defineCustomElement(LiveScore);

// Hàm đăng ký thẻ
export function register() {
  if (!customElements.get("wc-live-score")) {
    customElements.define("wc-live-score", LiveScoreElement);
    console.log("Web Component 'wc-live-score' registered successfully");
  }
}

// Tự động chạy khi được load qua script tag hoặc module import
register();

// Export constructor để dùng nếu cần
export default LiveScoreElement;
