import { defineCustomElement } from "vue";
import "@worldcup/ui-component/design-system.css";
import LiveScore from "./LiveScore.ce.vue";

// Convert Vue file into a Vue Custom Element constructor
const LiveScoreElement = defineCustomElement(LiveScore);

// Tag registration function
export function register() {
  if (!customElements.get("wc-live-score")) {
    customElements.define("wc-live-score", LiveScoreElement);
    console.log("Web Component 'wc-live-score' registered successfully");
  }
}

// Automatically run when loaded via script tag or module import
register();

// Export constructor for usage if needed
export default LiveScoreElement;
