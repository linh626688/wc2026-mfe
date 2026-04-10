import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { defineCustomElement } from "vue";
import LiveScore from "./LiveScore.ce.vue";

createApp(App).mount("#app");

const LiveScoreElement = defineCustomElement(LiveScore);
customElements.define("wc-live-score", LiveScoreElement);
